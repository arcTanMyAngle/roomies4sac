"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import NavigationBar from "@/components/navigation-bar"
import PreferenceRating from "@/components/preference-rating"
import MatchModal from "@/components/match-modal"
import type { UserProfile } from "@/lib/types"
import { calculateCompatibility } from "@/lib/utils"
import { currentUser, getPotentialMatches, addSwipe, createMatch } from "@/lib/mock-data"
import { X, Heart, Loader2 } from "lucide-react"
import { useSprings, animated, to as interpolate } from "@react-spring/web"
import { useDrag } from "@use-gesture/react"

// Remove any top-3 slice; show all
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: 0,
})
const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(10deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export default function SwipePage() {
  const router = useRouter()
  const [potentialMatches, setPotentialMatches] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [showMatch, setShowMatch] = useState(false)
  const [matchedUser, setMatchedUser] = useState<UserProfile | null>(null)
  const [currentMatchId, setCurrentMatchId] = useState<string | null>(null)
  const [gone] = useState(() => new Set<number>())

  // Fetch potential matches
  useEffect(() => {
    const fetchData = async () => {
      try {
        const potentialUsers = getPotentialMatches()
        setPotentialMatches(potentialUsers)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const [props, api] = useSprings(potentialMatches.length, (i) => ({
    ...to(i),
    from: from(),
  }))

  useEffect(() => {
    api.start((i) => to(i))
  }, [potentialMatches, api])

  async function handleSwipe(direction: "left" | "right", index: number) {
    if (!potentialMatches[index]) return
    const user = potentialMatches[index]
    const isLike = direction === "right"

    try {
      const swipeResult = addSwipe(user.id, isLike ? "like" : "dislike")
      setPotentialMatches((prev) => prev.filter((_, i) => i !== index))

      // If we matched, show modal
      if (isLike && swipeResult) {
        const newMatch = createMatch("current-user", user.id)
        setCurrentMatchId(newMatch.id)
        setMatchedUser(user)
        setShowMatch(true)
        // Store matched user in localStorage
        const chatUsers = JSON.parse(localStorage.getItem("chatUsers") || "[]")
        chatUsers.push(user)
        localStorage.setItem("chatUsers", JSON.stringify(chatUsers))
      }
    } catch (error) {
      console.error("Error recording swipe:", error)
    }
  }

  // Use drag
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity[0] > 0.2
    const dir = xDir < 0 ? -1 : 1

    if (!down && trigger) {
      gone.add(index)
      handleSwipe(dir === 1 ? "right" : "left", index)
    }

    api.start((i) => {
      if (i !== index) return
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
      const rot = mx / 100 + (isGone ? dir * 10 * velocity[0] : 0)
      const scale = down ? 1.1 : 1
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 30, tension: down ? 600 : isGone ? 200 : 400 },
      }
    })
  })

  function handleButtonSwipe(direction: "left" | "right") {
    if (!potentialMatches.length) return

    // Use the last index as the top card
    const index = potentialMatches.length - 1
    if (index < 0) return

    gone.add(index)

    api.start((i) => {
      if (i !== index) return
      const x = (200 + window.innerWidth) * (direction === "right" ? 1 : -1)
      return {
        x,
        rot: direction === "right" ? 10 : -10,
        scale: 1,
        delay: undefined,
        config: { friction: 50, tension: 200 },
      }
    })

    handleSwipe(direction, index)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading potential roommates...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header with Back to Home */}
      <header className="bg-white p-4 shadow-sm">
        <nav className="flex justify-between items-center max-w-md mx-auto">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-yellow-500">
            Roomie4Sac
          </Link>
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </nav>
      </header>

      <main className="max-w-md mx-auto p-4">
        {potentialMatches.length === 0 ? (
          <div className="h-[70vh] flex flex-col items-center justify-center text-center p-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <X className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No more profiles</h2>
            <p className="text-gray-600 mb-6">We've run out of potential roommates to show you!</p>
            <Button onClick={() => router.push("/matches")}>View Your Matches</Button>
          </div>
        ) : (
          <>
            <div className="h-[70vh] relative">
              {props.map(({ x, y, rot, scale }, i) => (
                <animated.div className="swipe-card absolute w-full h-full" key={i} style={{ x, y }}>
                  <animated.div
                    {...bind(i)}
                    style={{
                      transform: interpolate([rot, scale], trans),
                      touchAction: "none",
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                      backgroundColor: "white",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Card className="w-full h-full overflow-hidden">
                      <div className="relative h-[60%]">
                        {potentialMatches[i] ? (
                          <Image
                            src={potentialMatches[i]?.imagePath || "/placeholder.svg?height=300&width=400"}
                            alt={potentialMatches[i]?.name || "Profile"}
                            fill
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 animate-pulse" />
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                          <h2 className="text-white text-xl font-bold">
                            {potentialMatches[i]?.name}, {potentialMatches[i]?.age}
                          </h2>
                          <p className="text-white opacity-90">
                            {potentialMatches[i]?.major}, {potentialMatches[i]?.year}
                          </p>
                          {potentialMatches[i]?.dorm && (
                            <p className="text-white opacity-75 text-sm">{potentialMatches[i]?.dorm}</p>
                          )}
                        </div>
                      </div>

                      <div className="p-4 h-[40%] overflow-y-auto">
                        <div className="bg-green-100 text-primary text-sm font-medium px-3 py-1 inline-block rounded-full mb-3">
                          {calculateCompatibility(currentUser.preferences, potentialMatches[i]?.preferences)}% Match
                        </div>
                        <p className="text-gray-700 mb-4 line-clamp-3">
                          {potentialMatches[i]?.bio}
                        </p>
                        <div className="space-y-2">
                          <PreferenceRating
                            label="Cleanliness"
                            value={potentialMatches[i]?.preferences.cleanliness || 0}
                          />
                          <PreferenceRating
                            label="Noise Tolerance"
                            value={potentialMatches[i]?.preferences.noiseLevel || 0}
                          />
                          <PreferenceRating
                            label="Guest Comfort"
                            value={potentialMatches[i]?.preferences.guestComfort || 0}
                          />
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Schedule</span>
                            <span className="text-sm text-gray-600">
                              {potentialMatches[i]?.preferences.schedule}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </animated.div>
                </animated.div>
              ))}
            </div>

            <div className="flex justify-center gap-8 mt-6">
              <Button
                variant="outline"
                size="lg"
                className="h-16 w-16 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50"
                onClick={() => handleButtonSwipe("left")}
              >
                <X className="h-8 w-8" />
                <span className="sr-only">Dislike</span>
              </Button>
              <Button
                size="lg"
                className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90"
                onClick={() => handleButtonSwipe("right")}
              >
                <Heart className="h-8 w-8" />
                <span className="sr-only">Like</span>
              </Button>
            </div>
          </>
        )}
      </main>

      <NavigationBar />

      {showMatch && matchedUser && (
        <MatchModal
          currentUser={currentUser}
          matchedUser={matchedUser}
          matchId={currentMatchId!}
          onClose={() => setShowMatch(false)}
        />
      )}
    </div>
  )
}

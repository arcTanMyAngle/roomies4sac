"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import NavigationBar from "@/components/navigation-bar"
import type { UserProfile, Match } from "@/lib/types"
import { formatTimestamp } from "@/lib/utils"
import { getMatches, getUserById, getMessagesByMatchId } from "@/lib/mock-data"
import { Loader2, MessageSquare } from "lucide-react"

interface MatchWithUser extends Match {
  user: UserProfile
  lastMessage?: {
    text: string
    createdAt: number
    read: boolean
  }
}

export default function MatchesPage() {
  const router = useRouter()
  const [matches, setMatches] = useState<MatchWithUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Get all matches for current user
        const matchesData = getMatches()

        // Get user profiles for each match
        const matchesWithUsers: MatchWithUser[] = []

        for (const match of matchesData) {
          // Get the other user's ID
          const otherUserId = match.users.find((id) => id !== "current-user")
          if (!otherUserId) continue

          // Get the other user's profile
          const userData = getUserById(otherUserId)
          if (!userData) continue

          // Get the last message
          const messages = getMessagesByMatchId(match.id)
          const lastMessage = messages.length > 0 ? messages[messages.length - 1] : undefined

          matchesWithUsers.push({
            ...match,
            user: userData,
            lastMessage: lastMessage
              ? {
                  text: lastMessage.text,
                  createdAt: lastMessage.createdAt,
                  read: lastMessage.read || lastMessage.senderId === "current-user",
                }
              : undefined,
          })
        }

        setMatches(matchesWithUsers)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching matches:", error)
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  const handleMatchClick = (matchId: string, userId: string) => {
    router.push(`/chat/${matchId}?userId=${userId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading your matches...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Your Matches</h1>
      </header>

      <main className="max-w-md mx-auto p-4">
        {matches.length === 0 ? (
          <div className="h-[70vh] flex flex-col items-center justify-center text-center p-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No matches yet</h2>
            <p className="text-gray-600">Keep swiping to find your perfect roommate!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-white rounded-lg shadow-sm p-3 flex items-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleMatchClick(match.id, match.user.id)}
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={match.user.imagePath || "/placeholder.svg?height=56&width=56"}
                      alt={match.user.name}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  </div>
                  {match.lastMessage && !match.lastMessage.read && match.lastMessage.createdAt > 0 && (
                    <div className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full" />
                  )}
                </div>

                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-gray-900 truncate">{match.user.name}</h3>
                    {match.lastMessage && (
                      <span className="text-xs text-gray-500">{formatTimestamp(match.lastMessage.createdAt)}</span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 truncate">
                    {match.lastMessage ? match.lastMessage.text : "New match"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <NavigationBar />
    </div>
  )
}

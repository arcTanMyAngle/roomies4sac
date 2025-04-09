"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import NavigationBar from "@/components/navigation-bar"
import PreferenceRating from "@/components/preference-rating"
import type { UserProfile } from "@/lib/types"
import { currentUser } from "@/lib/mock-data"
import { Loader2, Settings } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use the mock current user
    setProfile(currentUser)
    setLoading(false)
  }, [])

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <header className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-center">Your Profile</h1>
      </header>

      <main className="max-w-md mx-auto p-4">
        {profile && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-primary p-6 text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                  <Image
                    src={profile.photoURL || "/placeholder.svg?height=96&width=96"}
                    alt={profile.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              </div>

              <h2 className="text-xl font-bold text-white">{profile.name}</h2>
              <p className="text-primary-foreground/80">
                {profile.major}, {profile.year}
              </p>
              {profile.dorm && <p className="text-primary-foreground/70 text-sm mt-1">{profile.dorm}</p>}
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">About Me</h3>
                <p className="text-gray-700">{profile.bio}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">My Preferences</h3>
                <div className="space-y-3">
                  <PreferenceRating label="Cleanliness" value={profile.preferences.cleanliness} />
                  <PreferenceRating label="Noise Tolerance" value={profile.preferences.noiseLevel} />
                  <PreferenceRating label="Guest Comfort" value={profile.preferences.guestComfort} />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Schedule</span>
                    <span className="text-sm text-gray-600">{profile.preferences.schedule}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 space-y-3">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleEditProfile}
              >
                <Settings className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        )}
      </main>

      <NavigationBar />
    </div>
  )
}

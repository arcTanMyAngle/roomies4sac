"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { currentUser } from "@/lib/mock-data"
import { AlertCircle, ArrowLeft, Upload, Loader2 } from "lucide-react"

export default function EditProfilePage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [major, setMajor] = useState("")
  const [year, setYear] = useState("")
  const [bio, setBio] = useState("")
  const [dorm, setDorm] = useState("")
  const [cleanliness, setCleanliness] = useState(3)
  const [noiseLevel, setNoiseLevel] = useState(3)
  const [guestComfort, setGuestComfort] = useState(3)
  const [schedule, setSchedule] = useState("Balanced")
  const [currentPhotoURL, setCurrentPhotoURL] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState("")

  useEffect(() => {
    // Use the mock current user
    const profile = currentUser

    setName(profile.name)
    setAge(profile.age.toString())
    setMajor(profile.major)
    setYear(profile.year)
    setBio(profile.bio)
    setDorm(profile.dorm || "")
    setCleanliness(profile.preferences.cleanliness)
    setNoiseLevel(profile.preferences.noiseLevel)
    setGuestComfort(profile.preferences.guestComfort)
    setSchedule(profile.preferences.schedule)
    setCurrentPhotoURL(profile.imagePath)
    setPhotoPreview(profile.imagePath)

    setLoading(false)
  }, [])

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setPhoto(file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError("")

    try {
      // In a real app, we would update the user profile here
      // For now, just simulate a delay and redirect
      setTimeout(() => {
        router.push("/profile")
      }, 1000)
    } catch (error: any) {
      setError(error.message || "Failed to update profile")
      setSaving(false)
    }
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
    <div className="min-h-screen bg-gray-50 pb-6">
      <header className="bg-white p-3 shadow-sm flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.push("/profile")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="text-xl font-bold">Edit Profile</h1>
      </header>

      <main className="max-w-md mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Update Your Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 p-3 rounded-md flex items-start gap-2 text-red-700 text-sm">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="photo">Profile Photo</Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                    {photoPreview ? (
                      <img
                        src={photoPreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="99"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select value={year} onValueChange={setYear} required>
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Freshman">Freshman</SelectItem>
                      <SelectItem value="Sophomore">Sophomore</SelectItem>
                      <SelectItem value="Junior">Junior</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="major">Major</Label>
                <Input id="major" value={major} onChange={(e) => setMajor(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dorm">Dorm/Housing</Label>
                <Select value={dorm} onValueChange={setDorm} required>
                  <SelectTrigger id="dorm">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="American River Courtyard">American River Courtyard</SelectItem>
                    <SelectItem value="Desmond Hall">Desmond Hall</SelectItem>
                    <SelectItem value="Draper Hall">Draper Hall</SelectItem>
                    <SelectItem value="Jenkins Hall">Jenkins Hall</SelectItem>
                    <SelectItem value="Riverview Hall">Riverview Hall</SelectItem>
                    <SelectItem value="Sierra Hall">Sierra Hall</SelectItem>
                    <SelectItem value="Sutter Hall">Sutter Hall</SelectItem>
                    <SelectItem value="Off-Campus">Off-Campus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell potential roommates about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="font-medium text-lg">Your Preferences</h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="cleanliness">Cleanliness</Label>
                    <span className="text-sm text-gray-500">{cleanliness}/5</span>
                  </div>
                  <Slider
                    id="cleanliness"
                    min={1}
                    max={5}
                    step={1}
                    value={[cleanliness]}
                    onValueChange={(value) => setCleanliness(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Relaxed</span>
                    <span>Very Neat</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="noiseLevel">Noise Tolerance</Label>
                    <span className="text-sm text-gray-500">{noiseLevel}/5</span>
                  </div>
                  <Slider
                    id="noiseLevel"
                    min={1}
                    max={5}
                    step={1}
                    value={[noiseLevel]}
                    onValueChange={(value) => setNoiseLevel(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Quiet</span>
                    <span>Loud</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="guestComfort">Guest Comfort</Label>
                    <span className="text-sm text-gray-500">{guestComfort}/5</span>
                  </div>
                  <Slider
                    id="guestComfort"
                    min={1}
                    max={5}
                    step={1}
                    value={[guestComfort]}
                    onValueChange={(value) => setGuestComfort(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Rarely</span>
                    <span>Often</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule Type</Label>
                  <Select value={schedule} onValueChange={setSchedule} required>
                    <SelectTrigger id="schedule">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Early Bird">Early Bird</SelectItem>
                      <SelectItem value="Night Owl">Night Owl</SelectItem>
                      <SelectItem value="Balanced">Balanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                {saving ? "Saving changes..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

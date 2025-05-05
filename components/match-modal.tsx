"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import type { UserProfile } from "@/lib/types"

interface MatchModalProps {
  currentUser: UserProfile
  matchedUser: UserProfile
  matchId: string
  onClose: () => void
}

export default function MatchModal({ currentUser, matchedUser, matchId, onClose }: MatchModalProps) {
  const router = useRouter()
  const [isClosing, setIsClosing] = useState(false)

  const handleSendMessage = () => {
    setIsClosing(true)
    setTimeout(() => {
      router.push(`/chat/${matchId}`)
      onClose()
    }, 300)
  }

  const handleKeepSwiping = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${isClosing ? "opacity-0" : "opacity-100"}`}
    >
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="text-white" size={32} />
        </div>

        <h2 className="text-2xl font-bold mb-2">It&apos;s a Match!</h2>
        <p className="text-gray-600 mb-6">You and {matchedUser.name} like each other</p>

        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-primary overflow-hidden">
              <Image
                src={currentUser.imagePath || "/placeholder.svg?height=80&width=80"}
                alt={currentUser.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-primary overflow-hidden">
              <Image
                src={matchedUser.imagePath || "/placeholder.svg?height=80&width=80"}
                alt={matchedUser.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={handleSendMessage} className="w-full">
            Send Message
          </Button>
          <Button onClick={handleKeepSwiping} variant="outline" className="w-full">
            Keep Swiping
          </Button>
        </div>
      </div>
    </div>
  )
}

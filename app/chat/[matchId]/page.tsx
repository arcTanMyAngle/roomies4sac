"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { UserProfile, Message } from "@/lib/types"
import { formatTimestamp } from "@/lib/utils"
import { getUserById, getMatchById, getMessagesByMatchId, addMessage, markMessagesAsRead } from "@/lib/mock-data"
import { ArrowLeft, Send, Loader2 } from "lucide-react"

export default function ChatPage({ params }: { params: { matchId: string } }) {
  const router = useRouter()
  const [otherUser, setOtherUser] = useState<UserProfile | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { matchId } = params

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get match details
        const matchData = getMatchById(matchId)

        if (!matchData) {
          router.push("/matches")
          return
        }

        // Get other user's profile
        const otherUserId = matchData.users.find((id: string) => id !== "current-user")
        if (!otherUserId) {
          router.push("/matches")
          return
        }

        const userData = getUserById(otherUserId)

        if (!userData) {
          router.push("/matches")
          return
        }

        setOtherUser(userData)

        // Get messages
        const messagesData = getMessagesByMatchId(matchId)
        setMessages(messagesData)

        // Mark messages as read
        markMessagesAsRead(matchId)

        setLoading(false)

        // Scroll to bottom
        scrollToBottom()
      } catch (error) {
        console.error("Error fetching chat data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [matchId, router])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !otherUser) return

    try {
      const message = addMessage(matchId, newMessage.trim())
      setMessages([...messages, message])
      setNewMessage("")

      // Scroll to bottom after sending
      setTimeout(scrollToBottom, 100)
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-lg text-gray-600">Loading conversation...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white p-3 shadow-sm flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.push("/matches")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>

        {otherUser && (
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image
                src={otherUser.photoURL || "/placeholder.svg?height=40&width=40"}
                alt={otherUser.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="font-medium">{otherUser.name}</h1>
              <p className="text-xs text-gray-500">{otherUser.major}</p>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <p className="text-gray-500 mb-2">No messages yet</p>
            <p className="text-sm text-gray-400">Say hello to start the conversation!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => {
              const isCurrentUser = message.senderId === "current-user"

              return (
                <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
                      isCurrentUser ? "bg-primary text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${isCurrentUser ? "text-primary-foreground/70" : "text-gray-500"}`}>
                      {formatTimestamp(message.createdAt)}
                    </p>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      <footer className="bg-white p-3 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </footer>
    </div>
  )
}

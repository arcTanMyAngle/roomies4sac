"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, MessageSquare, User } from "lucide-react"

export default function NavigationBar() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-10">
      <Link
        href="/swipe"
        className={`flex flex-col items-center justify-center w-1/3 ${pathname === "/swipe" ? "text-primary" : "text-gray-500"}`}
      >
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>

      <Link
        href="/matches"
        className={`flex flex-col items-center justify-center w-1/3 ${pathname === "/matches" || pathname.startsWith("/chat") ? "text-primary" : "text-gray-500"}`}
      >
        <MessageSquare size={24} />
        <span className="text-xs mt-1">Messages</span>
      </Link>

      <Link
        href="/profile"
        className={`flex flex-col items-center justify-center w-1/3 ${pathname === "/profile" ? "text-primary" : "text-gray-500"}`}
      >
        <User size={24} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
    </div>
  )
}

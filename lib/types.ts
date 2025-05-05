export interface UserProfile {
  id: string
  name: string
  age: number
  major: string
  year: string
  bio: string
  imagePath: string
  preferences: {
    cleanliness: number
    noiseLevel: number
    guestComfort: number
    schedule: "Night Owl" | "Early Bird" | "Balanced"
  }
  dorm?: string
  createdAt: number
}

export interface Match {
  id: string
  users: string[]
  createdAt: number
}

export interface Message {
  id: string
  matchId: string
  senderId: string
  text: string
  createdAt: number
  read: boolean
}

export interface SwipeAction {
  userId: string
  targetId: string
  action: "like" | "dislike"
  createdAt: number
}

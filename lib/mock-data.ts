import type { UserProfile, Match, Message, SwipeAction } from "./types"

// Mock current user (the app user)
export const currentUser: UserProfile = {
  id: "current-user",
  name: "Alex Johnson",
  age: 20,
  major: "Computer Science",
  year: "Junior",
  bio: "I'm a CS major who enjoys hiking, music, and photography. I'm looking for a roommate who is clean and respectful of quiet hours for studying.",
  photoURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  dorm: "Riverview Hall",
  preferences: {
    cleanliness: 4,
    noiseLevel: 2,
    guestComfort: 3,
    schedule: "Night Owl",
  },
  createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
}

// Mock potential matches
export const mockUsers: UserProfile[] = [
  {
    id: "user-1",
    name: "Jordan Smith",
    age: 19,
    major: "Business Administration",
    year: "Sophomore",
    bio: "Business major looking for a roommate who is social but also respects study time. I enjoy sports, movies, and hanging out with friends.",
    photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    dorm: "Sierra Hall",
    preferences: {
      cleanliness: 3,
      noiseLevel: 3,
      guestComfort: 4,
      schedule: "Balanced",
    },
    createdAt: Date.now() - 25 * 24 * 60 * 60 * 1000,
  },
  {
    id: "user-2",
    name: "Taylor Williams",
    age: 21,
    major: "Psychology",
    year: "Senior",
    bio: "Psychology student who loves reading, yoga, and quiet evenings. Looking for a clean and considerate roommate.",
    photoURL: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    dorm: "American River Courtyard",
    preferences: {
      cleanliness: 5,
      noiseLevel: 1,
      guestComfort: 2,
      schedule: "Early Bird",
    },
    createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
  },
  {
    id: "user-3",
    name: "Casey Brown",
    age: 20,
    major: "Engineering",
    year: "Junior",
    bio: "Engineering student who enjoys gaming, tech projects, and occasional parties. Looking for someone with similar interests.",
    photoURL: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=400&auto=format&fit=crop",
    dorm: "Desmond Hall",
    preferences: {
      cleanliness: 3,
      noiseLevel: 4,
      guestComfort: 4,
      schedule: "Night Owl",
    },
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
  },
  {
    id: "user-4",
    name: "Riley Garcia",
    age: 18,
    major: "Art",
    year: "Freshman",
    bio: "Art major who loves painting, music, and creative projects. Looking for an open-minded roommate who doesn't mind some artistic mess.",
    photoURL: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop",
    dorm: "Draper Hall",
    preferences: {
      cleanliness: 2,
      noiseLevel: 3,
      guestComfort: 5,
      schedule: "Night Owl",
    },
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
  },
  {
    id: "user-5",
    name: "Morgan Lee",
    age: 22,
    major: "Biology",
    year: "Senior",
    bio: "Pre-med student looking for a quiet and clean living environment. I spend most of my time studying but enjoy hiking and cooking on weekends.",
    photoURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    dorm: "Riverview Hall",
    preferences: {
      cleanliness: 5,
      noiseLevel: 1,
      guestComfort: 2,
      schedule: "Early Bird",
    },
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
  },
]

// Mock matches
export const mockMatches: Match[] = [
  {
    id: "match-1",
    users: ["current-user", "user-2"],
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
  },
  {
    id: "match-2",
    users: ["current-user", "user-3"],
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
]

// Mock messages
export const mockMessages: Record<string, Message[]> = {
  "match-1": [
    {
      id: "msg-1",
      matchId: "match-1",
      senderId: "user-2",
      text: "Hey! I think we'd make great roommates. What do you think?",
      createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: "msg-2",
      matchId: "match-1",
      senderId: "current-user",
      text: "Hi Taylor! I agree, our preferences seem to align well. What are your study habits like?",
      createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: "msg-3",
      matchId: "match-1",
      senderId: "user-2",
      text: "I usually study in the mornings and early afternoons. I like to keep the room quiet during study hours. How about you?",
      createdAt: Date.now() - 13 * 24 * 60 * 60 * 1000,
      read: true,
    },
  ],
  "match-2": [
    {
      id: "msg-4",
      matchId: "match-2",
      senderId: "user-3",
      text: "Hey Alex! We matched! Do you play any video games?",
      createdAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: "msg-5",
      matchId: "match-2",
      senderId: "current-user",
      text: "Hi Casey! Yes, I play a few. Mainly Valorant and Minecraft. You?",
      createdAt: Date.now() - 6 * 24 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: "msg-6",
      matchId: "match-2",
      senderId: "user-3",
      text: "Nice! I play those too. We should definitely game together sometime. Would be cool to room with a fellow gamer.",
      createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
      read: false,
    },
  ],
}

// Mock swipe actions
export const mockSwipes: SwipeAction[] = [
  {
    userId: "current-user",
    targetId: "user-1",
    action: "dislike",
    createdAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
  },
  {
    userId: "current-user",
    targetId: "user-2",
    action: "like",
    createdAt: Date.now() - 18 * 24 * 60 * 60 * 1000,
  },
  {
    userId: "current-user",
    targetId: "user-3",
    action: "like",
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
  },
  {
    userId: "user-2",
    targetId: "current-user",
    action: "like",
    createdAt: Date.now() - 16 * 24 * 60 * 60 * 1000,
  },
  {
    userId: "user-3",
    targetId: "current-user",
    action: "like",
    createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
  },
]

// Mock data access functions
export function getUserById(userId: string): UserProfile | null {
  if (userId === "current-user") return currentUser
  return mockUsers.find((user) => user.id === userId) || null
}

export function getPotentialMatches(): UserProfile[] {
  // Filter out users that the current user has already swiped on
  const swipedUserIds = mockSwipes.filter((swipe) => swipe.userId === "current-user").map((swipe) => swipe.targetId)

  return mockUsers.filter((user) => !swipedUserIds.includes(user.id))
}

export function getMatches(): Match[] {
  return mockMatches
}

export function getMatchById(matchId: string): Match | null {
  return mockMatches.find((match) => match.id === matchId) || null
}

export function getMessagesByMatchId(matchId: string): Message[] {
  return mockMessages[matchId] || []
}

export function addMessage(matchId: string, text: string): Message {
  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    matchId,
    senderId: "current-user",
    text,
    createdAt: Date.now(),
    read: false,
  }

  if (!mockMessages[matchId]) {
    mockMessages[matchId] = []
  }

  mockMessages[matchId].push(newMessage)
  return newMessage
}

export function addSwipe(targetId: string, action: "like" | "dislike"): SwipeAction {
  const newSwipe: SwipeAction = {
    userId: "current-user",
    targetId,
    action,
    createdAt: Date.now(),
  }

  mockSwipes.push(newSwipe)

  // If it's a like, check if it's a match
  if (action === "like") {
    const otherUserLiked = mockSwipes.some(
      (swipe) => swipe.userId === targetId && swipe.targetId === "current-user" && swipe.action === "like",
    )

    if (otherUserLiked) {
      // Create a new match
      const newMatch: Match = {
        id: `match-${Date.now()}`,
        users: ["current-user", targetId],
        createdAt: Date.now(),
      }

      mockMatches.push(newMatch)
      return newSwipe
    }
  }

  return newSwipe
}

export function markMessagesAsRead(matchId: string): void {
  if (mockMessages[matchId]) {
    mockMessages[matchId] = mockMessages[matchId].map((message) => {
      if (message.senderId !== "current-user" && !message.read) {
        return { ...message, read: true }
      }
      return message
    })
  }
}

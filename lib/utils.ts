import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateCompatibility(userPrefs: any, targetPrefs: any): number {
  // Simple compatibility algorithm based on preferences
  let score = 0
  const maxScore = 4 // 4 preference categories

  // Calculate difference in cleanliness (0-4 points)
  const cleanDiff = Math.abs(userPrefs.cleanliness - targetPrefs.cleanliness)
  score += (5 - cleanDiff) / 5

  // Calculate difference in noise tolerance (0-4 points)
  const noiseDiff = Math.abs(userPrefs.noiseLevel - targetPrefs.noiseLevel)
  score += (5 - noiseDiff) / 5

  // Calculate difference in guest comfort (0-4 points)
  const guestDiff = Math.abs(userPrefs.guestComfort - targetPrefs.guestComfort)
  score += (5 - guestDiff) / 5

  // Schedule compatibility (0 or 1 point)
  score += userPrefs.schedule === targetPrefs.schedule ? 1 : 0

  // Convert to percentage
  return Math.round((score / maxScore) * 100)
}

export function formatTimestamp(timestamp: number): string {
  const now = new Date()
  const date = new Date(timestamp)

  // If today, return time
  if (date.toDateString() === now.toDateString()) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // If yesterday, return "Yesterday"
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday"
  }

  // Otherwise return date
  return date.toLocaleDateString()
}

interface PreferenceRatingProps {
  label: string
  value: number
  max?: number
}

export default function PreferenceRating({ label, value, max = 5 }: PreferenceRatingProps) {
  return (
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="rating-dots">
        {Array.from({ length: max }).map((_, i) => (
          <div key={i} className={`rating-dot ${i < value ? "filled" : ""}`} aria-hidden="true" />
        ))}
      </div>
    </div>
  )
}

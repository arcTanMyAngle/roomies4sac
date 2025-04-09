interface PlaceholderImageProps {
  width: number
  height: number
  text?: string
}

export default function PlaceholderImage({ width, height, text = "Placeholder" }: PlaceholderImageProps) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#9ca3af",
        fontSize: "14px",
        borderRadius: "4px",
      }}
    >
      {text}
    </div>
  )
}

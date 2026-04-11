export const metadata = {
  title: "TravelSense CMS Studio",
  description: "Content management for TravelSense",
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}

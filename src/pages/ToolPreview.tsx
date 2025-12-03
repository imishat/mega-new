// pages/ToolPreview.tsx
import { useLocation } from "react-router-dom"

export default function ToolPreview() {

  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const url = urlParams.get("url")

  if (!url) return <p className="text-red-500">No URL provided.</p>

  return (
    <div className="min-h-screen bg-black text-white p-4 overflow-auto scrollbar-hide">
  <div className="relative w-full h-[100vh] rounded-xl border overflow-hidden">
    <iframe
      src={url}
      className="absolute top-0 left-0 w-full h-full"
      loading="lazy"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
      title="Tool Preview"
      // DO NOT add scrolling="no" if you want scroll enabled
    />
  </div>
</div>

  )
}

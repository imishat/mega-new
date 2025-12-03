

const FreeHttp = () => {

//   const location = useLocation()
//   const urlParams = new URLSearchParams(location.search)
  const url = ' https://global.megaproxy.us'

  if (!url) return <p className="text-red-500">No URL provided.</p>

    return (
          <div className="min-h-screen  text-white p-4 overflow-auto scrollbar-hide">
      <div className="relative w-full h-[100vh] rounded-xl border">
        <iframe
          src={url}
          className="absolute top-0 left-0 w-full h-full border-none"
          loading="lazy"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
          title="Tool Preview"
        />
      </div>
    </div>
  )
};

export default FreeHttp;
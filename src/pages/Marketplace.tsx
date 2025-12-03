


const Marketplace = () => {

//   const location = useLocation()
//   const urlParams = new URLSearchParams(location.search)
  const url = ' https://megaproxy.us'

  if (!url) return <p className="text-red-500">No URL provided.</p>

    return (
         <div className="min-h-screen bg-black text-white p-4 overflow-auto scrollbar-hide ">
      {/* Back Button */}
     

      {/* Preview */}
      <iframe
        src={url}
          className="w-full h-[100vh] rounded-xl border"
            style={{ overflow: 'hidden' }}
  scrolling="no"
  loading="lazy"
//   scrolling="no" // legacy but may still help
  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
  title="Tool Preview"
      />
    </div>
  )
};

export default Marketplace;
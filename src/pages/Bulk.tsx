


const Bulk = () => {
// const navigate = useNavigate()
//   const location = useLocation()
//   const urlParams = new URLSearchParams(location.search)
  const url = ' https://bulk.megainfo.io	'

  if (!url) return <p className="text-red-500">No URL provided.</p>

    return (
         <div className="min-h-screen  text-white p-4 overflow-auto scrollbar-hide">
      {/* Back Button */}
      {/* <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        ← Back
      </button> */}

      {/* Preview */}
      <iframe
        src={url}
          className="w-full h-[100vh] rounded-xl border"
  loading="lazy"
//   scrolling="no" // legacy but may still help
   sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
  title="Tool Preview"
      />
    </div>
  )
  
};

export default Bulk;
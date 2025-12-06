import MetricsSection from "../components/MetricsSection"
// import InboxSection from "../components/InboxSection"

import  { useEffect, useState } from "react";

export default function Dashboard() {
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    // Show notice when Dashboard mounts
    setShowNotice(false);

    // Hide after 20 seconds
    const timer = setTimeout(() => {
      setShowNotice(false);
    }, 2000);

    // Cleanup
    return () => clearTimeout(timer);
  }, []);

  return (
  
     <div className="container mx-auto px-6 py-8 space-y-8 ">
      {/* Floating Notice Box */}
      {showNotice && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-lg max-w-xs w-full">
      <h2 className="text-lg font-bold mb-2">Important Notice</h2>
      <p className="mb-3 text-sm">
        Please visit:
        <br />
        <a
          href="https://notice.megainfo.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all"
        >
          https://notice.megainfo.io/
        </a>
      </p>
      <button
        onClick={() => setShowNotice(false)}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
      >
        Dismiss
      </button>
    </div>
  </div>
)}


      {/* Main Dashboard Content */}
      <MetricsSection />
      {/* <InboxSection /> */}
    </div> );
}





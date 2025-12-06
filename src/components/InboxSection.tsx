import { useState } from "react";
import { useGetInformationQuery } from "../redux/Features/infoApi/infoApi"
import InboxList from "./InboxList"

export default function InboxSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useGetInformationQuery({
    ...(searchQuery && { searchTerm: searchQuery }),
    page: currentPage,
  }); // Pass current page to API query



  return (
    <div className="bg-white  rounded-lg shadow p-6">
      <div className="">
        {isLoading ? (
         <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
         </div>
        ) : (
          <InboxList data={data} setCurrentPage={setCurrentPage} currentPage={currentPage} setSearchQuery={setSearchQuery}searchQuery={searchQuery} />
        )}
      </div>
    </div>
  )
}


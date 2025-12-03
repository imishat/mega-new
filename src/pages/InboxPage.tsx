import { useState } from "react";
import InboxList from "../components/InboxList"
import { useGetInformationQuery } from "../redux/Features/infoApi/infoApi"

export default function InboxPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
 // Manage current page state
  const { data } = useGetInformationQuery({ ...(searchTerm && { searchTerm: searchTerm }), page: currentPage }); // Pass current page to API query
console.log(data,"agernt")

  return (
    <div className=" max-w-full mx-auto px-6 py-8">
    <InboxList data={data} setCurrentPage={setCurrentPage} currentPage={currentPage} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  )
}


/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetWebsiteQuery } from "../redux/Features/websites/websiteApi";
import { handleCopyClick } from "../utils/copyToClipboard";
import { useAppSelector } from "../redux/hooks";
import WebsiteModal from "./DetailsModel";
import { categoryOptions } from "./data/category";

const transferTypes = ["gmail", "yahoo", "outlook", "proton"] as const;
type TransferType = typeof transferTypes[number];

const maskUrl = (url: string, visibleCount: number = 10): string => {
  if (!url) return "";
  const visible = url.slice(0, visibleCount);
  const masked = "*".repeat(Math.max(url.length - visibleCount, 0));
  return `${visible}${masked}`;
};

export default function WebsiteList() {
  const [selectedWebsite, setSelectedWebsite] = useState<any>(null);
  // const [typeFilter, setTypeFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("Google");
  // const [searchTerm, setSearchTerm] = useState("");
  const [transferOpenFor, setTransferOpenFor] = useState<string | null>(null);
  const [selectedTransferTypes, setSelectedTransferTypes] = useState<
    Record<string, TransferType | "">
  >({});

  const user: any = useAppSelector((state) => state.auth.data);
  const userSubscriptions = user?.data?.subscriptions || [];

  // Conditionally pass query params
  // const { data: allWebsites = [] }: any = useGetWebsiteQuery(
  //   {
  //     // ...(typeFilter && { type: typeFilter }),
  //     ...(categoryFilter && { category: categoryFilter }),
  //     // ...(searchTerm && { searchTerm: searchTerm }),
  //   },
  // );

  const { data: allWebsites = [] }: any = useGetWebsiteQuery(
  {
    ...(categoryFilter && { category: categoryFilter }),
  },
  {
    skip: !categoryFilter, // skip query if categoryFilter is falsy
  }
);

  // Create a map of owned websites for quick lookup
  const ownedWebsitesMap = new Map(
    userSubscriptions.map((sub: any) => [sub.website, sub])
  );

  // Filter and merge websites - prioritize user subscriptions data when available
  const websites = allWebsites
    .filter((website: any) => {
      // Show all free websites or paid websites (owned or not)
      return website.type === "free" || website.type === "paid";
    })
    .map((website: any) => {
      // If website is owned, merge with subscription data
      const subscription = ownedWebsitesMap.get(website.siteUrl);
      return subscription
        ? { ...website, ...subscription, isOwned: true }
        : { ...website, isOwned: false };
    })
    // Remove duplicates by siteUrl
    .filter((website: any, index: number, self: any[]) =>
      index === self.findIndex((w) => w.siteUrl === website.siteUrl)
    );

  const buyWebsite = (website: any) => {
    setSelectedWebsite(website);
  };
console.log(websites,)
  const closeModal = () => {
    setSelectedWebsite(null);
  };

  // Save website URL to localStorage under selected transfer type
  const handleTransferSave = (websiteId: string, websiteUrl: string) => {
    const selectedTransferType = selectedTransferTypes[websiteId];
    if (!selectedTransferType) return;

    // Get current links from localStorage
    const currentLinks = JSON.parse(localStorage.getItem("links") || "{}");

    // First, remove the URL from all other transfer types
    transferTypes.forEach((type) => {
      if (currentLinks[type] && Array.isArray(currentLinks[type])) {
        currentLinks[type] = currentLinks[type].filter(
          (url: string) => url !== websiteUrl,
        );
      }
    });

    // Then add to the selected transfer type (if not already present)
    if (!Array.isArray(currentLinks[selectedTransferType])) {
      currentLinks[selectedTransferType] = [];
    }

    if (!currentLinks[selectedTransferType].includes(websiteUrl)) {
      currentLinks[selectedTransferType].push(websiteUrl);
    }

    // Save back to localStorage
    localStorage.setItem("links", JSON.stringify(currentLinks));

    // Reset UI states
    setTransferOpenFor(null);
    setSelectedTransferTypes((prev) => ({ ...prev, [websiteId]: "" }));
  };

  const handleTransferTypeChange = (websiteId: string, value: TransferType) => {
    setSelectedTransferTypes((prev) => ({ ...prev, [websiteId]: value }));
  };

  // Toggle transfer dropdown for a specific website
  const toggleTransferDropdown = (websiteId: string) => {
    setTransferOpenFor(prev => prev === websiteId ? null : websiteId);
    // Reset the selected transfer type when opening
    if (transferOpenFor !== websiteId) {
      setSelectedTransferTypes(prev => ({ ...prev, [websiteId]: "" }));
    }
  };
  return (
    <div className="min-h-screen bg-white text-gray-100 p-4 md:p-8">
      <h3 className="text-3xl font-bold mb-8 text-center text-blue-400">
        Website List
      </h3>

      {/* Filters */}
      
      <div className="w-full sm:w-auto my-5">
  
  <div className="flex flex-wrap gap-4">
    {categoryOptions.map((option) => (
     <button
  key={option.value}
  onClick={() => setCategoryFilter(option.value)}
  className={`px-8 py-2 rounded-md border text-sm font-medium
    ${
      categoryFilter === option.value
        ? 'bg-green-600 text-white border-green-600' // changed to green
        : 'bg-white dark:bg-[#2b7fff] text-gray-800 dark:text-white border-gray-300 dark:border-gray-600'
    }
    hover:bg-green-600 hover:text-white transition-all duration-200
  `}
>
  {option.label}
</button>

    ))}
    
  </div>
</div>

      {/* Website Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {websites?.map((website: any) => {
                const showUrl = website.isOwned || website.type === "free";

                return (
                  <tr key={website._id || website.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap text-black">
                      {website.sites || website.name} 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
  <input
    type="text"
    className="border rounded px-2 py-1 w-full text-black"
    value={showUrl ? (website.siteUrl || website.website?.substring(0, 8)) : maskUrl(website.siteUrl || website.website)}
      onCopy={(e) => e.preventDefault()} 
       onCut={(e) => e.preventDefault()} 
    readOnly
  />
</td>

                    <td className="px-6 py-4 whitespace-nowrap">
  <div className="flex items-center gap-3">
    <span
      className={`px-2 py-2 rounded-full text-xs ${
        website.type === "paid"
          ? "bg-purple-600 text-white"
          : "bg-green-600 text-white"
      }`}
    >
      {website.type}
    </span>
     <button
      onClick={() => {
        if (website.video) {
          window.open(website.video, "_blank"); // opens in new tab
        } else {
          alert("No video available for this website.");
        }
      }}
      className="px-2 py-2  text-xs font-bold bg-red-600 text-white hover:bg-red-700 transition"
    >
      view link
    </button>
  </div>
</td>

                    <td className="px-6 py-4 whitespace-nowrap capitalize text-black">
                      {website.price} TAKA
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      {website.isOwned ? (
                        
                        <>
                          <button
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                            onClick={() =>
                              handleCopyClick(`${website.siteUrl || website.website}?id=${user?.data.id}`)
                            }
                          >
                            Copy
                          </button>
                          {website.category === "hack" && (
                            <>
                              <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                                onClick={() => toggleTransferDropdown(website._id || website.id)}
                              >
                                {transferOpenFor === (website._id || website.id) ? "Close" : "Transfer"}
                              </button>

                              {/* Transfer dropdown - only shown for the clicked website */}
                              {transferOpenFor === (website._id || website.id) && (
                                <div className="mt-2 flex items-center">
                                  <select
                                    value={selectedTransferTypes[website._id || website.id] || ""}
                                    onChange={(e) =>
                                      handleTransferTypeChange(
                                        website._id || website.id,
                                        e.target.value as TransferType,
                                      )
                                    }
                                    className="p-2 border border-gray-600 rounded-md bg-white text-white"
                                  >
                                    <option value="">Select type</option>
                                    {transferTypes.map((type) => (
                                      <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                      </option>
                                    ))}
                                  </select>
                                  <button
                                    disabled={!selectedTransferTypes[website._id || website.id]}
                                    onClick={() =>
                                      handleTransferSave(website._id || website.id, website.siteUrl || website.website)
                                    }
                                    className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md disabled:opacity-50 transition"
                                  >
                                    Save
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </>
                      ) : website.type === "paid" ? (
                        <button
                          className="bg-purple-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                          onClick={() => buyWebsite(website)}
                        >
                          Buy
                        </button>
                      ) : (
                        <>
                         <button
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                          onClick={() =>
                            handleCopyClick(`${website.siteUrl || website.website}?id=${user?.data.id}`)
                          }
                        >
                          Copy
                        </button>
                        
                       
                       

                         {website.category === "hack" && (
                            <>
                              <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                                onClick={() => toggleTransferDropdown(website._id || website.id)}
                              >
                                {transferOpenFor === (website._id || website.id) ? "Close" : "Transfer"}
                              </button>

                              {/* Transfer dropdown - only shown for the clicked website */}
                              {transferOpenFor === (website._id || website.id) && (
                                <div className="mt-2 flex items-center">
                                  <select
                                    value={selectedTransferTypes[website._id || website.id] || ""}
                                    onChange={(e) =>
                                      handleTransferTypeChange(
                                        website._id || website.id,
                                        e.target.value as TransferType,
                                      )
                                    }
                                    className="p-2 border border-gray-600 rounded-md bg-white text-white"
                                  >
                                    <option value="">Select type</option>
                                    {transferTypes.map((type) => (
                                      <option key={type} value={type}>
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                      </option>
                                    ))}
                                  </select>
                                  <button
                                    disabled={!selectedTransferTypes[website._id || website.id]}
                                    onClick={() =>
                                      handleTransferSave(website._id || website.id, website.siteUrl || website.website)
                                    }
                                    className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md disabled:opacity-50 transition"
                                  >
                                    Save
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                         </>
                      )}
                      
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {selectedWebsite && (
        <WebsiteModal website={selectedWebsite} onClose={closeModal} />
      )}
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { handleCopyClick } from "../utils/copyToClipboard";

const transferTypes = ["gmail", "yahoo", "outlook", "proton"] as const;
type TransferType = typeof transferTypes[number];

const categoryTypes = ["all", "hack", "login", "videoCall"] as const;
type CategoryType = typeof categoryTypes[number];

export default function PremiumList() {
  const user: any = useAppSelector((state: any) => state.auth.data.data);
  const [transferOpenFor, setTransferOpenFor] = useState<string | null>(null);
  const [selectedTransferTypes, setSelectedTransferTypes] = useState<Record<string, TransferType | "">>({});
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");

  // Save website URL to localStorage under selected transfer type
  const handleTransferSave = (websiteId: string, websiteUrl: string) => {
    const selectedTransferType = selectedTransferTypes[websiteId];
    if (!selectedTransferType) return;

    // Get current links from localStorage
    const currentLinks = JSON.parse(localStorage.getItem("links") || "{}");

    // First, remove the URL from all other transfer types
    transferTypes.forEach(type => {
      if (currentLinks[type] && Array.isArray(currentLinks[type])) {
        currentLinks[type] = currentLinks[type].filter((url: string) => url !== websiteUrl);
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
    setSelectedTransferTypes(prev => ({ ...prev, [websiteId]: "" }));
  };

  // Filter subscriptions based on selected category
  const filteredSubscriptions = user?.subscriptions.filter((website: any) => {
    if (selectedCategory === "all") return true;
    return website.category.toLowerCase() === selectedCategory;
  });

  const handleTransferTypeChange = (websiteId: string, value: TransferType) => {
    setSelectedTransferTypes(prev => ({ ...prev, [websiteId]: value }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Website List</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <label htmlFor="category-filter" className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as CategoryType)}
              className="p-2 border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600"
            >
              {categoryTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSubscriptions?.map((website: any) => (
                <tr key={website._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{website.name} / {website.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{website.website}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                      onClick={() => handleCopyClick(`${website.website}&id=${user?.id}`)}
                    >
                      Copy
                    </button>

                    {website.category.toLowerCase() === "hack" && (
                      <>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                          onClick={() => {
                            setTransferOpenFor(prev => prev === website._id ? null : website._id);
                          }}
                        >
                          Transfer
                        </button>

                        {/* Transfer dropdown */}
                        {transferOpenFor === website._id && (
                          <div className="mt-2">
                            <select
                              value={selectedTransferTypes[website._id] || ""}
                              onChange={(e) => handleTransferTypeChange(website._id, e.target.value as TransferType)}
                              className="p-2 border rounded-md"
                            >
                              <option value="">Select type</option>
                              {transferTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </option>
                              ))}
                            </select>
                            <button
                              disabled={!selectedTransferTypes[website._id]}
                              onClick={() => handleTransferSave(website._id, website.website)}
                              className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md disabled:opacity-50"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setTransferOpenFor(null)}
                              className="ml-2 bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-md"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
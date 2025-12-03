/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

export default function GoogleTransfer({ setSeter }: any) {
  const [linksData, setLinksData] = useState<any>({});
  const [newService, setNewService] = useState("");
  const [newLink, setNewLink] = useState("");

  // Load links from localStorage
  useEffect(() => {
    const storedLinks = localStorage.getItem("links");
    setLinksData(storedLinks ? JSON.parse(storedLinks) : {});
  }, []);

  // Handle Copy
  const handleLinkClick = (link: string) => {
    // handleCopyClick(link);
    setSeter(link); // Set the copied link
  };

  // Handle Delete
  const handleDelete = (service: string, index: number) => {
    const updatedLinks = { ...linksData };
    updatedLinks[service].splice(index, 1);

    if (updatedLinks[service].length === 0) {
      delete updatedLinks[service];
    }

    localStorage.setItem("links", JSON.stringify(updatedLinks));
    setLinksData(updatedLinks);
  };

  // Handle Add Link
  const handleAddLink = () => {
    if (!newService.trim() || !newLink.trim()) return;

    const updatedLinks = { ...linksData };

    if (!updatedLinks[newService]) {
      updatedLinks[newService] = [];
    }
    updatedLinks[newService].push(newLink.trim());

    localStorage.setItem("links", JSON.stringify(updatedLinks));
    setLinksData(updatedLinks);

    // Clear inputs
    setNewService("");
    setNewLink("");
  };

  // Flatten all links with their source service
const allLinks: { link: string; service: string; index: number }[] = [];

Object.entries(linksData as Record<string, string[]>).forEach(([service, links]) => {
  links.forEach((link, index) => {
    allLinks.push({ link, service, index });
  });
});

  return (
    <div>
      <h2 className="text-xl my-10 font-semibold">All Saved Links</h2>

      {/* Add Link Section */}
      <div className="mb-6 flex flex-col sm:flex-row gap-2 items-center">
        <input
          type="text"
          placeholder="Service name (e.g. gmail)"
          value={newService}
          onChange={(e) => setNewService(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm dark:bg-gray-700 flex-grow"
        />
        <input
          type="text"
          placeholder="Enter link URL"
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 rounded-md p-2 text-sm dark:bg-gray-700 flex-grow"
        />
        <button
          onClick={handleAddLink}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Add Link
        </button>
      </div>

      {/* Existing Links List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {allLinks.length > 0 ? (
          allLinks.map(({ link, service, index }) => (
            <div
              key={`${service}-${index}`}
              onClick={() => handleLinkClick(link)}
              className="p-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm cursor-pointer"
            >
              <div
                className="truncate cursor-pointer"
                title={link}
                
              >
                    <span className="text-xl text-gray-400">({service})</span>
                    <span className="block">{link}</span>
            
              </div>
              <button
                className="ml-2 text-red-500 hover:text-red-700 text-xs"
                onClick={() => handleDelete(service, index)}
                title="Delete link"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-500 col-span-full">No links available.</div>
        )}
      </div>
    </div>
  );
}

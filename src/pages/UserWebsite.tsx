import { useEffect, useState } from 'react';
import CustomWebsitePackage from './CustomWebsitePackage';
import { useAppSelector } from '../redux/hooks';

interface Website {
  id: number;
  name: string;
  url: string;
}

const UserWebsite = () => {
   const [websites, setWebsites] = useState<Website[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data }: any = useAppSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [uri, setUri] = useState("");
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);

  // Load from localStorage
  // useEffect(() => {
  //   const storedWebsites = localStorage.getItem("websites");
  //   if (storedWebsites) {
  //     setWebsites(JSON.parse(storedWebsites));
  //   }
  
  // }, []);
    useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch(
          `https://megatools.site/api/v1/personal/link-all?createdBy=${data.data.id}&subAdminId=${data.data.referals}`
        );
        const datas = await res.json();
     
         setWebsites(datas.data.data); // backend returns { success, data }
      } catch (error) {
        console.error("Error fetching personal links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  if (loading) return <p>Loading...</p>;

  // Save to localStorage
  // useEffect(() => {
  //   localStorage.setItem("websites", JSON.stringify(websites));
  // }, [websites]);

  const handleAddWebsite = () => {
        // localStorage.setItem("websites", JSON.stringify(websites));
    setName("");
    setUri("");
    setEditId(null);
    setShowModal(true);
  };

  const handleSave = async () => {
  if (name.trim() === "" || uri.trim() === "") {
    alert("Please fill in both fields");
    return;
  }

  try {
    const response = await fetch("https://megatools.site/api/v1/personal/link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${data?.data.token}`, // if using auth
      },
      body: JSON.stringify({ name, url: uri, createdBy: data?.data?.id,subAdminId:data?.data?.referals }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error || "Failed to save website");
    }

    // const savedWebsite = await response.json();
    

    // Reset form
    setName("");
    setUri("");
    setEditId(null);
    setShowModal(false);

  } catch (err) {
    console.error("Error saving website:", err);
    alert("Something went wrong while saving the website. Please try again.");
  }
};


 const handleDelete = (id: number) => {
  const updated = websites.filter((w) => w.id !== id);
  setWebsites(updated);
  localStorage.setItem("websites", JSON.stringify(updated)); // <- save to localStorage
};

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard!");
    });
  };

  return (
   <>
   <div className="p-6 font-sans bg-gray-100 min-h-screen">
      
      <div className='flex justify-between' >
        
<h2 className="text-2xl font-semibold mb-4 ">Manage Websites</h2>
        <button
        onClick={handleAddWebsite}
        className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow "
      >
        Add Website
      </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50  text-black">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {editId !== null ? "Edit Website" : "Add New Website"}
            </h3>
            <div className="mb-3">
              <label className="block mb-1 font-medium text-black">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">URI:</label>
              <input
                type="text"
                value={uri}
                onChange={(e) => setUri(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white divide-y divide-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wide">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wide">
                URL
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {websites.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No websites added.
                </td>
              </tr>
            ) : (
              websites.map((website) => (
                <tr key={website.id}>
                  <td className="px-6 py-4 text-blue-600">{website.name}</td>
                  <td className="px-6 py-4 flex items-center space-x-2">
                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-words"
                    >
                      {website.url}
                    </a>
                    
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleCopy(website.url)}
                      className="px-2 py-1 bg-teal-500 hover:bg-teal-600 text-white text-sm rounded"
                    >
                      Copy
                    </button>
                  </td>
                  
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => handleDelete(website.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <CustomWebsitePackage/>
      </div>
    </div>
   
    </>)
};

export default UserWebsite;
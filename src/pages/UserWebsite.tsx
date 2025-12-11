import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";

import { handleCopyClick } from "../utils/copyToClipboard";

type Tool = {
  name: string;
  label: string;
  domain: string;
};

const UserWebsite: React.FC = () => {
   const user = useAppSelector((state:any)=>state.auth.data.data)
   console.log(user.id,"id")
  const [tools, setTools] = useState<Tool[]>([]);
  const [search, setSearch] = useState("");
  const [newTool, setNewTool] = useState<Tool>({
    name: "",
    label: "",
    domain: "https://view-map-com.live/",
  });

  useEffect(() => {
    try {
      const saved =
        typeof window !== "undefined" ? localStorage.getItem("tools") : null;
      if (saved) setTools(JSON.parse(saved));
    } catch (err) {
      console.warn("Failed to read saved tools:", err);
    }
  }, []);

  const handleAddTool = () => {
    if (!newTool.name.trim() || !newTool.label.trim()) {
      alert("Name and URL are required.");
      return;
    }

    const updated = [
      ...tools,
      { ...newTool, label: newTool.domain + newTool.label.trim() },
    ];
    setTools(updated);

    try {
      localStorage.setItem("tools", JSON.stringify(updated));
    } catch (err) {
      console.warn("Failed to save tools:", err);
    }

    setNewTool({ name: "", label: "", domain: "https://view-map-com.live/" });
  };

  const handleDeleteTool = (index: number) => {
    const updated = tools.filter((_, i) => i !== index);
    setTools(updated);
    try {
      localStorage.setItem("tools", JSON.stringify(updated));
    } catch (err) {
      console.warn("Failed to update tools:", err);
    }
  };

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-gray-900">
      <h1 className="text-3xl text-center font-semibold text-blue-600 mb-6">
        Personal Web Site
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search Tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 px-4 py-2 rounded-md border border-gray-300 bg-white outline-none"
        />
      </div>

      {/* Create New Tool */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow border space-y-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Create New Link</h2>

        <div className="space-y-1">
          <label className="text-gray-700 font-medium">Link</label>
          <input
            type="text"
            placeholder="Link"
            value={newTool.label}
            onChange={(e) =>
              setNewTool((s) => ({ ...s, label: e.target.value }))
            }
            className="w-full px-4 py-3 rounded border border-gray-300 bg-white"
          />
        </div>

        <div className="space-y-1">
          <label className="text-gray-700 font-medium">Select Domain</label>
          <select
            className="w-full px-4 py-3 rounded border border-gray-300 bg-white"
            value={newTool.domain}
            onChange={(e) =>
              setNewTool((s) => ({ ...s, domain: e.target.value }))
            }
          >
            <option value="https://view-map-com.live/">https://view-map-com.live/</option>
          
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-gray-700 font-medium">Sitename</label>
          <input
            type="text"
            placeholder="Map Google"
            value={newTool.name}
            onChange={(e) =>
              setNewTool((s) => ({ ...s, name: e.target.value }))
            }
            className="w-full px-4 py-3 rounded border border-gray-300 bg-white"
          />
        </div>

        <div>
          <button
            onClick={handleAddTool}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded shadow"
          >
            Generate Link
          </button>
        </div>
      </div>

      {/* Table of Tools */}
      {filteredTools.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No links yet — add one above.
        </div>
      ) : (
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                  Sitename
                </th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                  Link
                </th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                  Path
                </th>
                <th className="py-3 px-6 text-left text-gray-700 font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.map((tool, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-3 px-6 text-gray-900 font-medium">{tool.name}</td>
                  <td className="py-3 px-6 text-gray-700 break-words">{tool.label}</td>
                  {/* <td className="py-3 px-6 text-blue-600 underline break-words">
                    {tool.label.replace(tool.domain, "")}
                  </td> */}
                  <td className="py-3 px-6 space-x-2">
                    <button
                                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition"
                                          onClick={() => handleCopyClick(`${tool.label}/${user.id}`)}
                                        >
                                          Copy
                                        </button>
                    <button
                      onClick={() => handleDeleteTool(i)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserWebsite;

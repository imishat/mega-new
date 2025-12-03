import{ useEffect, useState } from "react";

type Tool = {
  name: string;

  label: string;
};

const PersonalWebsite = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newTool, setNewTool] = useState({ name: "", label: "" });

  useEffect(() => {
    const saved = localStorage.getItem("tools");
    if (saved) {
      setTools(JSON.parse(saved));
    }
  }, []);

  const handleAddTool = () => {
    if (!newTool.name || !newTool.label) return alert("Name and Label are required.");
    const updated = [...tools, newTool];
    setTools(updated);
    localStorage.setItem("tools", JSON.stringify(updated));
    setNewTool({ name: "",  label: "" });
    setShowModal(false);
  };

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen  text-black p-6">
      <h1 className="text-3xl text-center font-semibold text-blue-400 mb-6">Personal Web Site</h1>

      {/* Header Section */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <input
          type="text"
          placeholder="Search Tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" text-black px-4 py-2 rounded-md w-80 outline-none border border-gray-600"
        />
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-black px-4 py-2 rounded-md"
        >
          Add New Tool
        </button>
      </div>

      {/* Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTools.map((tool, i) => (
          <div key={i} className=" p-4 rounded-xl shadow hover:shadow-lg transition bg-gray-700">
            <h2 className="text-lg font-semibold mb-1 text-white">{tool.name}</h2>
            
            <a href={tool?.label}target="_blank" className="text-xs mt-2 inline-block  px-2 py-0.5 rounded-full text-white">
              {tool.label}  <span className=" text-green-500 text-xl p-2 ">Click To Go</span>
            </a>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#1e293b] p-6 rounded-xl w-[90%] max-w-md space-y-4 text-blackshadow-lg">
            <h2 className="text-xl font-semibold mb-2">Add New Web site</h2>
            <input
              type="text"
              placeholder="Web Site  Name"
              value={newTool.name}
              onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
              className="w-full px-3 py-2 rounded bg-[#0f172a] border border-gray-600"
            />
            
            <input
              type="text"
              placeholder="url"
              value={newTool.label}
              onChange={(e) => setNewTool({ ...newTool, label: e.target.value })}
              className="w-full px-3 py-2 rounded bg-[#0f172a] border border-gray-600"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTool}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalWebsite;

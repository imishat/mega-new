/* eslint-disable @typescript-eslint/no-explicit-any */




import { useState } from "react"
import {
  useGetToolsQuery, useCreateToolMutation,
  useUpdateToolMutation,
  // useDeleteToolMutation,
} from "../redux/Features/othertools/othertoolsApi"
import { useAppSelector } from "../redux/hooks"
import { useNavigate } from "react-router-dom"

interface Tool {
  _id?: string
  name: string
  description: string
  url: string
  category: string
}

export default function ToolsGrid() {
  const user:any = useAppSelector((state:any) => state.auth.data.data)
  const [searchQuery, setSearchQuery] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingTool, setEditingTool] = useState<Tool | null>(null)
  const [formData, setFormData] = useState<Omit<Tool, "id">>({
    name: "",
    description: "",
    url: "",
    category: "",
  })

  const { data: tools = [], refetch }: any = useGetToolsQuery({})
  const [createTool] = useCreateToolMutation()
  const [updateTool] = useUpdateToolMutation()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-pattern
  // const [] = useDeleteToolMutation()

  // const [deleteTool] = useDeleteToolMutation()

 const navigate = useNavigate()

  const handleClick = (url: string) => {
    const fixedUrl = url.startsWith("http") ? url : `https://${url}`
    navigate(`/preview?url=${encodeURIComponent(fixedUrl)}`)
  }
  const handleFormSubmit = async () => {
    try {
      if (editingTool) {
        await updateTool({ id: editingTool._id, data: formData }).unwrap()
      } else {
        await createTool(formData).unwrap()
      }
      refetch()
      setShowModal(false)
      setEditingTool(null)
      setFormData({ name: "", description: "", url: "", category: "" })
    } catch (err) {
      console.error("Error submitting form:", err)
    }
  }


  // const handleDelete = async (id: string) => {
  //   try {
  //     await deleteTool(id).unwrap()
  //     refetch()
  //   } catch (err) {
  //     console.error("Error deleting:", err)
  //   }
  // }


  const filteredTools = tools?.filter((tool: Tool) =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white text-gray-100 p-4 md:p-8">
      <h3 className="text-3xl font-bold mb-8 text-center text-blue-400">Mega Tools</h3>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search Tools..."
          className="w-full sm:w-1/2 p-3 border border-gray-700 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {user?.role === "admin" && (
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200 font-medium"
          >
            Add New Tool
          </button>
        )}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredTools.map((tool:Tool) => (
          <div
            key={tool._id}
            className=" p-5 bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative group cursor-pointer text-white" 
            onClick={() => handleClick(tool.url)}
          >
            <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
            <p className=" text-sm ">{tool.description}</p>
            {tool.category && (
              <span className="inline-block mt-3 px-2 py-1 text-xs rounded-full bg-blue-400">
                {tool.category}
              </span>
            )}
            {user.role === "admin" && (
              <div className="absolute top-3 right-3 flex gap-2">
                {/* Edit/Delete buttons */}
              </div>
            )}
          </div>
        ))}
      </div>

      

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md relative border border-gray-700">
            <button
              onClick={() => {
                setShowModal(false)
                setEditingTool(null)
                setFormData({ name: "", description: "", url: "", category: "" })
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl mb-6 font-bold text-blue-400">
              {editingTool ? "Edit Tool" : "Add New Tool"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Tool name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <input
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Tool description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">URL</label>
                <input
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="https://example.com"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                <input
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Tool category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false)
                  setEditingTool(null)
                  setFormData({ name: "", description: "", url: "", category: "" })
                }}
                className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                {editingTool ? "Update Tool" : "Add Tool"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
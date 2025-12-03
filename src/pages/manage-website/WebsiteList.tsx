/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
;
import { IWebsite } from "../../@types/website";
import { useDeleteWebsiteMutation, useGetWebsiteQuery, useUpdateWebsiteMutation } from "../../redux/Features/websites/websiteApi";
import { categoryOptions } from "../../components/data/category";

export default function WebsiteList() {
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [categoryFilter,setCategoryFilter] = useState<string>("")
  const [searchTerm,setSearchTerm] =useState("")
  const [editingWebsite, setEditingWebsite] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
const { data: websites, isLoading, refetch }: any = useGetWebsiteQuery(
  {
    ...(typeFilter && { type: typeFilter }),
    ...(categoryFilter && { category: categoryFilter }),
    ...(searchTerm && { searchTerm: searchTerm }),
  },
);
  const [deleteWebsite] = useDeleteWebsiteMutation();
  const [updateWebsite] = useUpdateWebsiteMutation();

  const handleEdit = (website: IWebsite) => {
    setEditingWebsite(website);
    setIsModalOpen(true);
  };

  const handleDelete = async (websiteId: string) => {
    if (confirm("Are you sure you want to delete this website?")) {
      try {
        await deleteWebsite(websiteId).unwrap();
        refetch();
        alert("Website deleted successfully");
      } catch (error) {
        alert("Error deleting website");
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWebsite) return;

    try {
      const formData = new FormData()
      const { images, ...restData } = editingWebsite;
      formData.append("data", JSON.stringify(restData));

      if (images && images.length > 0) {
        const imageFiles = Array.isArray(images) && images.every(img => img instanceof File)
          ? Array.from(images)
          : [];
        imageFiles.forEach((file) => {
          formData.append("images", file);
        });
      }
      await updateWebsite({ id: editingWebsite._id, data: formData }).unwrap();
      alert(`Website ${editingWebsite.sites} updated successfully`);
      setIsModalOpen(false);
      setEditingWebsite(null);
      refetch();
    } catch (error) {
      alert("Error updating website");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditingWebsite((prev: any) => ({
      ...prev!,
      [name]: name === "price" ? Number(value) : value
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Website List</h3>

      {/* Filters */}
<div className="flex flex-col sm:flex-row gap-4 mb-6 items-start">
  {/* Search Input */}
  <div className="w-full sm:w-[250px]">
    <label className="block text-sm font-medium mb-1 dark:text-white">Search</label>
    <input
      type="text"
      placeholder="Search websites..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
    />
  </div>

  {/* Filter by Type */}
  <div className="w-full sm:w-[250px]">
    <label className="block text-sm font-medium mb-1 dark:text-white">Filter by Type</label>
    <select
      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
      value={typeFilter}
      onChange={(e) => setTypeFilter(e.target.value)}
    >
      <option value="">All</option>
      <option value="free">Free</option>
      <option value="paid">Paid</option>
    </select>
  </div>

  {/* Filter by Category */}
  <div className="w-full sm:w-[250px]">
    <label className="block text-sm font-medium mb-1 dark:text-white">Filter by Category</label>
    <select
      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
      value={categoryFilter}
      onChange={(e) => setCategoryFilter(e.target.value)}
    >
       {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
    </select>
  </div>
</div>

{/* button */}





      {/* Website Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {websites?.map((website: IWebsite) => (
                <tr key={website._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{website.sites} / {website.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={website.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {website.siteUrl}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {website.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {website.price} TAKA
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleEdit(website)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(website._id!)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Edit Website</h3>
              <form onSubmit={handleSave}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Site Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Site Name*</label>
                    <input
                      type="text"
                      name="sites"
                      value={editingWebsite?.sites || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Category*</label>
                    <select
                      name="category"
                      value={editingWebsite?.category || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    >
                       {categoryOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
                    </select>
                  </div>

                  {/* URL */}
                  <div>
                    <label className="block text-sm font-medium mb-1">URL*</label>
                    <input
                      type="text"
                      name="siteUrl"
                      value={editingWebsite?.siteUrl || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Type*</label>
                    <select
                      name="type"
                      value={editingWebsite?.type || 'free'}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    >
                      <option value="free">Free</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="description"
                      value={editingWebsite?.description || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                      rows={3}
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={editingWebsite?.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  {/* Documentation URL */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Documentation URL</label>
                    <input
                      type="url"
                      name="docs"
                      value={editingWebsite?.docs || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  {/* Video URL */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Video URL</label>
                    <input
                      type="url"
                      name="video"
                      value={editingWebsite?.video || ''}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  {/* Images */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Images</label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) {
                          setEditingWebsite((prev: any) => ({
                            ...prev!,
                            images: Array.from(e.target.files!)
                          }));
                        }
                      }}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


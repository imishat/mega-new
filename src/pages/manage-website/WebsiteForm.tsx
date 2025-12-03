import { useForm } from "react-hook-form";
import { IWebsite } from "../../@types/website";
import { useCreateWebsiteMutation } from "../../redux/Features/websites/websiteApi";
import { categoryOptions } from "../../components/data/category";

interface WebsiteFormProps {
  editingWebsite?: IWebsite | null;
  onClose: () => void;
}

// const categoryOptions = [
//   "auto",
//   "videoCall",
//   "hack",
//   "login",
  
  
// ];

export default function WebsiteForm({ editingWebsite, onClose }: WebsiteFormProps) {
  const [createWebsite] = useCreateWebsiteMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IWebsite>({
    defaultValues: editingWebsite || {
      siteUrl: "",
      category: "",
      sites: "",
      type: "free",
      description: "",
      price: 0,
      docs: "",
      video: "https://example.com/auto-call.mp4", // default video call placeholder
      images: []
    }
  });

  const onSubmit = async (data: IWebsite) => {
    const formData = new FormData();
    const { images, ...restData } = data;

    formData.append("data", JSON.stringify(restData));

    if (images && images.length > 0) {
      const imageFiles = Array.isArray(images) && images.every(img => img instanceof File)
        ? Array.from(images)
        : [];
      imageFiles.forEach((file) => {
        formData.append("images", file);
      });
    }

    await createWebsite(formData).unwrap();
    console.log(formData,"fromdata")
    onClose();
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">
        {editingWebsite ? "Edit Website" : "Add New Website"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Site URL</label>
            <input
              {...register("siteUrl", { required: "Site URL is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.siteUrl && <p className="text-red-500 text-sm">{errors.siteUrl.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a category</option>
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Site Name</label>
            <input
              {...register("sites", { required: "Site name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.sites && <p className="text-red-500 text-sm">{errors.sites.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              {...register("type")}
              className="w-full p-2 border rounded"
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              {...register("price", {
                valueAsNumber: true,
                min: { value: 0, message: "Price must be positive" }
              })}
              className="w-full p-2 border rounded"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Documentation URL</label>
            <input
              {...register("docs")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Video URL</label>
            <input
              {...register("video")}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              {...register("description")}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Images</label>
            <input
              type="file"
              multiple
              {...register("images")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="bg-red-800 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
            type="submit"
          >
            {editingWebsite ? "Update Website" : "Add Website"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useCreateAdminUserMutation,  useGetAllUserQuery, } from "../../redux/Features/auth/authApi";
import { toast } from "react-hot-toast";
import Pagination from "../../components/Pagination";
import { useAppSelector } from "../../redux/hooks";
import { useDeleteUserMutation } from "../../redux/Features/websites/websiteApi";

interface User {
    _id: string;
    username: string;
    name: string
    email: string;
    role: string;
    createdAt: string;
    referals?:string
}

export default function User() {
    const user = useAppSelector((state:any)=>state.auth.data.data)

const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
    
    const [currentPage,setCurrentPage] = useState(1)
    const [createUser] = useCreateAdminUserMutation();
    const { data: users = [], refetch }: any = useGetAllUserQuery({ page: currentPage });
        console.log(users?.data?.result.id,"user")
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user",
        name: '',
        referals:user.id
    });
      const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser(formData).unwrap();
            toast.success("User created successfully!");
            setFormData({
                name: '',
                username: "",
                email: "",
                password: "",
                role: "user",
                referals: user.id
            });
            setShowCreateForm(false);
            refetch();
        } catch (err: any) {
            toast.error(err?.message || "Failed to create user");
        }
    };
  const handleDeleteUser = async (userId: string) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    try {
      await deleteUser(userId).unwrap();
       refetch();
      // Optional: show success toast
    } catch (error) {
      // Optional: show error toast
      console.error("Failed to delete user:", error);
    }
  }
};

    return (
        <div className="container mx-auto p-4 text-black">
            <h1 className="text-2xl font-bold mb-6">User Management</h1>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">User List</h2>
          {!user?.referals && (
  <button
    onClick={() => setShowCreateForm(!showCreateForm)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
  >
    {showCreateForm ? "Cancel" : "Create New User"}
  </button>
)}


            </div>

            {showCreateForm && (
                <div className="bg-white text-black p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-lg font-semibold mb-4">Create New User</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                            Create User
                        </button>
                    </form>
                </div>
            )}

          <div className="bg-white text-black rounded-lg shadow overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50 dark:bg-gray-700">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase">Username</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase">Email</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase">Role</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase">Created At</th>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {users && users?.data?.result.map((user: User) => (
          <tr key={user._id}>
            <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete user "${user.username}"?`)) {
                    handleDeleteUser(user._id);
                  }
                }}
                className="text-red-600 hover:text-red-800 focus:outline-none transition-colors"
                aria-label={`Delete user ${user.username}`}
              >
                {/* Trash icon (using Heroicons v2 - replace if using different library) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <Pagination
      currentPage={currentPage}
      onPageChange={handlePageChange}
      totalPage={users?.data?.meta?.totalPage}
    />
  </div>
</div>
        </div>
    );
}
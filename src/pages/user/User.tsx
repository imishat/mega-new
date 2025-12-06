/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useCreateAdminUserMutation,  useGetAllUserQuery, } from "../../redux/Features/auth/authApi";
import { toast } from "react-hot-toast";
import Pagination from "../../components/Pagination";
import { useAppSelector } from "../../redux/hooks";

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

    
    const [currentPage,setCurrentPage] = useState(1)
    const [createUser] = useCreateAdminUserMutation();
    const { data: users = [], refetch }: any = useGetAllUserQuery({ page: currentPage });
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
   

    return (
        <div className="container mx-auto p-4">
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
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
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

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Created At</th>
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
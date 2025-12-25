/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setAuthData } from "../redux/Features/auth/authSlice"
import toast from "react-hot-toast"
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, Link2, LogOut, LogIn } from "lucide-react";
import { HomeIcon, ToolIcon, UserIcon, } from "./Icons"

interface MenuItem {
  title: string;
  path?: string;
  icon?: JSX.Element;
  children?: {
    title: string;
    path: string;
  }[];
}

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const { data }: any = useAppSelector((state) => state.auth);
  console.log(data,"user")
  const dispatch = useAppDispatch();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const baseMenuItems: MenuItem[] = [
    {
      title: "Home",
      path: "/Home",
      icon: <HomeIcon className="h-5 w-5 text-black" />,
    },
    {
      title: "Information",
      path: "/inbox",
      icon: <HomeIcon className="h-5 w-5 text-black" />,
    },
    {
      title: "Website List",
      path: "/Conversation",
      icon: <HomeIcon className="h-5 w-5 text-black" />,
    },
 
  ];

  const adminMenuItems = data?.data?.role === 'admin' ? [
    {
      title: "Management",
      path: "/manage-website",
      icon: <ToolIcon className="h-5 w-5 text-black" />,
      children: [
        // {
        //   title: "Manage Website",
        //   path: "/manage-website",
        // },
           {
      title: "Create Users",
      path: "/users",
      icon: <UserIcon className="h-5 w-5 text-black" />,
    },
      ]
    }
  ] : [];

  const menuItems: MenuItem[] = [...baseMenuItems, ...adminMenuItems];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(setAuthData({ data: {}, token: "" }));
    navigate('/')
    toast.success("You have been logged out successfully.");
  };

  return (
    <div className={`${collapsed ? "w-20" : "w-72"} h-screen overflow-y-auto bg-white text-black shadow transition-all duration-300 flex flex-col border-r border-gray-300`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,2L1,12H5V22H19V12H23L12,2Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-black">
              Admin Dashboard
            </h2>
          </motion.div>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-all"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          )}
        </motion.button>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 px-2 py-4 space-y-1">
        {menuItems?.map((item, index) => (
          <motion.li 
            key={item.title}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {item?.children ? (
              <>
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
                  className={`flex items-center w-full p-3 rounded-lg transition-all ${collapsed ? "justify-center" : "justify-between"} ${openDropdown === item.title ? "bg-gray-100" : "hover:bg-gray-50"}`}
                >
                  <div className="flex items-center">
                    <span>{item.icon}</span>
                    {!collapsed && <span className="ml-3">{item.title}</span>}
                  </div>
                  {!collapsed && (
                    <motion.div
                      animate={{ rotate: openDropdown === item.title ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </motion.div>
                  )}
                </button>

                {!collapsed && openDropdown === item.title && (
                  <motion.ul 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {item.children.map((child) => (
                      <li key={child.path}>
                        <motion.button
                          whileHover={{ x: 5 }}
                          onClick={() => {
                            navigate(child.path);
                            setOpenDropdown(null);
                          }}
                          className={`w-full text-left p-2.5 pl-8 rounded-lg flex items-center ${location.pathname === child.path ? "bg-gray-200 text-black" : "hover:bg-gray-100 text-gray-700"}`}
                        >
                          <motion.span 
                            animate={location.pathname === child.path ? { scale: [1, 1.2, 1], opacity: [0.6, 1, 1] } : { scale: 1, opacity: 0.6 }}
                            transition={{ duration: 0.3 }}
                            className="w-2 h-2 rounded-full bg-black mr-3"
                          />
                          {child.title}
                        </motion.button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </>
            ) : (
              item.path &&  
              <Link to={item.path}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center w-full p-3 rounded-lg ${collapsed ? "justify-center" : "justify-start"} ${location.pathname === item.path ? "bg-gray-200 text-black shadow-inner" : "hover:bg-gray-100 text-gray-700"}`}
                >
                  <motion.div
                    animate={location.pathname === item.path ? { scale: [1, 1.1, 1], rotate: [0, 5, 0] } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon}
                  </motion.div>
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </motion.button>
              </Link>
            )}
          </motion.li>
        ))}

        <motion.div className="border-t border-gray-200 my-2" />

        <motion.li>
          <a
            href="https://dashboard-live-chat.2025.tools/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center w-full p-3 rounded-lg ${collapsed ? "justify-center" : "justify-start"} hover:bg-gray-100 text-gray-700`}
          >
            <motion.div whileHover={{ rotate: 45 }}>
              <Link2 className="text-black" />
            </motion.div>
            {!collapsed && (
              <div className="ml-3 flex items-center">
                <span>Live Support</span>
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="ml-2 text-xs bg-gray-200 text-black px-2 py-0.5 rounded-full"
                >
                  New
                </motion.span>
              </div>
            )}
          </a>
        </motion.li>
      </ul>

      {/* User Section */}
      <motion.div className="p-4 border-t border-gray-200">
        {collapsed ? (
          <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-black font-medium shadow-md">
              {data?.data?.username?.charAt(0).toUpperCase()}
            </div>
          </motion.div>
        ) : (
          <motion.div whileHover={{ x: 5 }} className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-black font-medium shadow-md">
              {data?.data?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-black truncate">{data?.data?.name}</p>
              <p className="text-xs text-gray-600 truncate">{data?.data?.role} (ID) {data?.data?.id}</p>
            </div>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={data?.data?.email ? handleLogout : () => navigate("/")}
          className={`mt-4 flex items-center w-full p-3 rounded-lg ${collapsed ? "justify-center" : "justify-start"} bg-gray-200 hover:bg-gray-300 text-black`}
        >
          {data?.data?.email ? (
            <motion.div animate={{ x: [0, -2, 2, -2, 0], transition: { duration: 0.5, repeat: Infinity } }} className="flex items-center">
              <LogOut className="text-red-600" />
              {!collapsed && <span className="ml-3">Sign out</span>}
            </motion.div>
          ) : (
            <motion.div animate={{ x: [0, 2, -2, 2, 0], transition: { duration: 0.5, repeat: Infinity } }} className="flex items-center">
              <LogIn className="text-blue-600" />
              {!collapsed && <span className="ml-3">Sign in</span>}
            </motion.div>
          )}
        </motion.button>
      </motion.div>
    </div>
  )
}

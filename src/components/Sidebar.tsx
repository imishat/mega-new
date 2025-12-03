/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSX, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  HomeIcon,
  //  InboxIcon, 
  GlobeIcon, ToolIcon, 
  UserIcon,
  ServiceIcon,
 
  

} from "./Icons"

import { useAppDispatch, useAppSelector } from "../redux/hooks"

import { setAuthData } from "../redux/Features/auth/authSlice"
import toast from "react-hot-toast"

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown, Link2, LogOut, LogIn } from "lucide-react";
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
  console.log(data,"userdata")
  const dispatch = useAppDispatch();
const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const baseMenuItems : MenuItem[] = [
    {
      title: "Dashboard",
      path: "/Home",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      title: "Website List",
      path: "/Conversation",
      icon: <HomeIcon className="h-5 w-5" />,
    //    children: [
    
    //   // {
    //   //   title: "Conversation",
    //   //   path: "/Conversation",
    //   // },
    //   // {
    //   //   title: "Personal Url",
    //   //   path: "/user-web",
    //   // },
    //   // {
    //   //   title: "Website Url",
    //   //   path: "/website",
    //   // },
    // ]
    },
    //  {
    //   title: "Website List",
    //   path: "/website",
    //   icon: <GlobeIcon className="h-5 w-5" />,
    // },
    {
      title: "Shortener",
      path: "/mega-service",
      icon: <GlobeIcon className="h-5 w-5" />,
    //    children: [
    
    //   {
    //     title: "URL Shortener",
    //     path: "/premium-website",
    //   },
    //   {
    //     title: "Proxy List",
    //     path: "/FreeHttp",
    //   },
    // ],
    },
  
   
    {
      title: "Proxy",
      path: "/proxy",
      icon: <ToolIcon className="h-5 w-5" />,
    },
    {
      title: " Tools",
      path: "/tools",
      icon: <ToolIcon className="h-5 w-5" />,
    },
    {
      title: "Create Website",
      path: `https://megaparsonals.in/website/?id=${data?.data?.id}`,
      icon: <ServiceIcon className="h-5 w-5" />,
    },
       
        {
      title: "Buy Sell",
      path: "/Marketplace",
      icon: <GlobeIcon className="h-5 w-5" />,
    },
   {
      title: " Create Users",
      path: "/users",
      icon: <UserIcon className="h-5 w-5" />,
    },
        {
      title: "More",
      path: "/TagSupport",
      icon: <GlobeIcon className="h-5 w-5" />,
      children: [
       {
         title: "Your Site",
        path: "/PersonalUrl",
      },
     {
         title: "Notepad",
         path: "/notepad",
      },
      //    {
      //   title: "Manage Website",
      //   path: "/manage-website",
      // },
      {
        title: "Settings",
        path: "/Settings",}
    //  {
    //      title: "Settings",
    //      path: "/Settings",
    //   },
    //  {
    //      title: "About",
    //      path: "/About",
    //   },
    //  {
    //      title: "For Help",
    //      path: "/ForHelp",
    //   },
      
     ],
     
    },
  
    
      
     
  ];

  // Add admin-only menu items if user is admin
  const adminMenuItems = data?.data?.role === 'admin' ? [
    {
      title: "Management",
      path: "/manage-website",
      icon: <ToolIcon className="h-5 w-5" />,
       children: [
    
      // {
      //   title: "All Users",
      //   path: "/users",
      // },
      {
        title: "Manage Website",
        path: "/manage-website",
      },
     ]
    }
  ] : [];

  const menuItems : MenuItem[] = [...baseMenuItems, ...adminMenuItems];

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(setAuthData({ data: {}, token: "" }));
    navigate('/')
    toast.success("You have been logged out successfully.");
  };

  return (
 <div className={`${collapsed ? "w-20" : "w-72"} h-screen overflow-y-auto bg-gradient-to-b from-[#1a1f2d] to-[#0d1117] shadow-xl transition-all duration-300 flex flex-col border-r border-gray-800`}>
  {/* Header with subtle animation */}
  <div className="flex items-center justify-between p-4 border-b border-gray-800">
    {!collapsed && (
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center space-x-2"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2L1,12H5V22H19V12H23L12,2Z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">
          Admin Dashboard 
        </h2>
      </motion.div>
    )}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setCollapsed(!collapsed)}
      className="p-2 rounded-lg hover:bg-gray-800 transition-all"
    >
      {collapsed ? (
        <ChevronRight className="h-5 w-5 text-gray-400" />
      ) : (
        <ChevronLeft className="h-5 w-5 text-gray-400" />
      )}
    </motion.button>
  </div>

  {/* Menu Items with staggered animations */}
  <ul className="flex-1 px-2 py-4 space-y-1">
    {menuItems?.map((item, index) => (
      <motion.li 
          key={item.title}
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.05 }}
    className={index === 4 ? "mt-10" : ""}
      >
        {item?.children ? (
          <>
            <button
              onClick={() => setOpenDropdown(openDropdown === item.title ? null : item.title)}
              className={`flex items-center w-full p-3 rounded-lg transition-all ${
                collapsed ? "justify-center" : "justify-between"
              } ${
                openDropdown === item.title 
                  ? "bg-gray-800/50 backdrop-blur-sm"
                  : "hover:bg-gray-800/30"
              }`}
            >
              <div className="flex items-center">
                <span className="text-blue-400">{item.icon}</span>
                {!collapsed && (
                  <span className="ml-3 text-gray-200">{item.title}</span>
                )}
              </div>
              {!collapsed && (
                <motion.div
                  animate={{ rotate: openDropdown === item.title ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-gray-400" />
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
                      className={`w-full text-left p-2.5 pl-8 rounded-lg transition-all flex items-center ${
                        location.pathname === child.path
                          ? "bg-blue-900/20 text-blue-300"
                          : "hover:bg-gray-800/20 text-gray-300"
                      }`}
                    >
                      <motion.span 
                        animate={location.pathname === child.path ? 
                          { scale: [1, 1.2, 1], opacity: [0.6, 1, 1] } : 
                          { scale: 1, opacity: 0.6 }
                        }
                        transition={{ duration: 0.3 }}
                        className="w-2 h-2 rounded-full bg-blue-400 mr-3"
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
          <Link to ={item.path}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center w-full p-3 rounded-lg ${
                collapsed ? "justify-center" : "justify-start"
              } ${
                location.pathname === item.path
                  ? "bg-blue-900/30 text-white shadow-inner"
                  : "hover:bg-gray-800/20 text-gray-300"
              }`}
            >
              <motion.div
                animate={location.pathname === item.path ? 
                  { scale: [1, 1.1, 1], rotate: [0, 5, 0] } : 
                  { scale: 1, rotate: 0 }
                }
                transition={{ duration: 0.3 }}
              >
                {item.icon}
              </motion.div>
              {!collapsed && (
                <span className="ml-3">{item.title}</span>
              )}
            </motion.button>
          </Link>
        )}
      </motion.li>
    ))}

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: menuItems.length * 0.05 + 0.1 }}
      className="border-t border-gray-800/50 my-2"
    />

    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (menuItems.length + 1) * 0.05 }}
    >
      <a
        href="https://dashboard-live-chat.2025.tools/"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center w-full p-3 rounded-lg ${
          collapsed ? "justify-center" : "justify-start"
        } hover:bg-purple-900/20 text-gray-300`}
      >
        <motion.div whileHover={{ rotate: 45 }}>
          <Link2 className="text-purple-400" />
        </motion.div>
        {!collapsed && (
          <div className="ml-3 flex items-center">
            <span>Live Support</span>
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="ml-2 text-xs bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded-full"
            >
              New
            </motion.span>
          </div>
        )}
      </a>
    </motion.li>
    {/* <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (menuItems.length + 1) * 0.05 }}
    >
      <a
        href="https://megatools.app/"
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center w-full p-3 rounded-lg ${
          collapsed ? "justify-center" : "justify-start"
        } hover:bg-purple-900/20 text-gray-300`}
      >
        <motion.div whileHover={{ rotate: 45 }}>
          <Link2 className="text-purple-400" />
        </motion.div>
        {/* {!collapsed && (
          <div className="ml-3 flex items-center">
            <span>Admin Dashboard</span>
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="ml-2 text-xs bg-purple-900/30 text-purple-300 px-2 py-0.5 rounded-full"
            >
              Admin
            </motion.span>
          </div>
        )}
      </a> */}
    {/* </motion.li> */} 
  </ul>

  {/* User Section with animation */}
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: (menuItems.length + 2) * 0.05 }}
    className="p-4 border-t border-gray-800"
  >
    {collapsed ? (
      <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-medium shadow-md">
          {data?.data?.username?.charAt(0).toUpperCase()}
        </div>
      </motion.div>
    ) : (
      <motion.div 
        whileHover={{ x: 5 }}
        className="flex items-center space-x-3"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-medium shadow-md">
          {data?.data?.username?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-white truncate">{data?.data?.name}</p>
          <p className="text-xs text-gray-400 truncate">{data?.data?.role} (ID) {data?.data?.id}</p>
        </div>
      </motion.div>
    )}

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={data?.data?.email ? handleLogout : () => navigate("/")}
      className={`mt-4 flex items-center w-full p-3 rounded-lg ${
        collapsed ? "justify-center" : "justify-start"
      } bg-gray-800 hover:bg-gray-700/70 text-gray-300 hover:text-white`}
    >
      {data?.data?.email ? (
        <motion.div 
          animate={{ 
            x: [0, -2, 2, -2, 0],
            transition: { duration: 0.5, repeat: Infinity }
          }}
          className="flex items-center"
        >
          <LogOut className="text-red-400" />
          {!collapsed && <span className="ml-3">Sign out</span>}
        </motion.div>
      ) : (
        <motion.div 
          animate={{ 
            x: [0, 2, -2, 2, 0],
            transition: { duration: 0.5, repeat: Infinity }
          }}
          className="flex items-center"
        >
          <LogIn className="text-blue-400" />
          {!collapsed && <span className="ml-3">Sign in</span>}
        </motion.div>
      )}
    </motion.button>
  </motion.div>
</div>

  )
}
import type React from "react"

import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import InboxPage from "./pages/InboxPage"

import WebsitePage from "./pages/WebsitePage"
import ToolsPage from "./pages/ToolsPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Verify from "./pages/Verify"
import PrivateRoute from "./PrivateRoute"
import ForgetPassword from "./pages/ForgetPassword"
import ResetPassword from "./pages/ResetPassword"
import useNotificationSound from "./hooks/useNotification"
import NotificationPermission from "./utils/Notify"
import ManageWebsite from "./pages/ManageWebsite"
import Success from "./components/Success"
// import PremiumPage from "./pages/PremiumPage"
import User from "./pages/user/User"
import ToolPreview from "./pages/ToolPreview"
import FreeShortener from "./pages/FreeShortener"
import Marketplace from "./pages/Marketplace"
import FreeHttp from "./pages/FreeHttp"
import Conversation from "./pages/Conversation"
import Notepad from "./pages/Notepad"
import PersonalWebsite from "./pages/PresonalWebsite"
import UserWebsite from "./pages/UserWebsite"
import Home from "./pages/Home"
import Mega from "./pages/Mega"
import Proxy from "./pages/Proxy"





function App() {
  useNotificationSound()


  // Listen for socket events globally

  // Layout with sidebar for authenticated routes
  const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 scrollbar-hide">
         <div className="flex-shrink-0">
    <Sidebar />
  </div>
        <NotificationPermission/>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    )
  }

  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/sign-up" element={<RegisterPage />} />
      <Route path="/verify" element={<Verify />} />
       <Route path="/preview" element={
       < PrivateRoute>
       <DashboardLayout>
              <ToolPreview />
            </DashboardLayout>
            </PrivateRoute>} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected routes */}
      <Route
        path="/Home"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/inbox"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <InboxPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/Conversation"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Conversation />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/user-web"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <UserWebsite />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/PersonalUrl"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <PersonalWebsite />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/mega-service"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Mega />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/notepad"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Notepad />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
     
      <Route
        path="/website"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <WebsitePage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/Marketplace"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Marketplace />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
        <Route
        path="/premium-website"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <FreeShortener />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
        <Route
        path="/proxy"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Proxy />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/tools"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <ToolsPage />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/manage-website"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <ManageWebsite />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/FreeHttp"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <FreeHttp />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
       <Route
        path="/users"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <User />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
       <Route
        path="/success"
        element={
          <PrivateRoute>
            <DashboardLayout>
              <Success />
            </DashboardLayout>
          </PrivateRoute>
        }
      />
    </Routes>
    
  )
}

export default App


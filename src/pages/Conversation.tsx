import  { useState } from "react";

import UserWebsite from "./UserWebsite";
import NewPage from '../components/NewPage';

const Conversation = () => {
  const [activeTab, setActiveTab] = useState<"web" | "personal">("web");

  return (
    <div className="p-6">
      {/* Buttons */}
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={() => setActiveTab("web")}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            activeTab === "web"
              ? "bg-cyan-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Web List
        </button>
        <button
          onClick={() => setActiveTab("personal")}
          className={`px-8 py-3 rounded-lg font-semibold transition-all ${
            activeTab === "personal"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          Personal
        </button>
      </div>

      {/* Content */}
      <div className="  rounded-xl text-white text-center shadow">
        {/* {activeTab === "web" &&<WebsitePage /> } */}

        {activeTab === "web" &&<NewPage /> }
        {activeTab === "personal" && <UserWebsite/>}
      </div>
    </div>
  );
};

export default Conversation;

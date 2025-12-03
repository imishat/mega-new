import { useState } from "react";
import FreeHttp from './FreeHttp';



const Proxy = () => {
      const [activeTab, setActiveTab] = useState<"web" | "personal"|"costume" >("web");
        
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
                  Free Proxy
                </button>
                {/* <button
                  onClick={() => setActiveTab("personal")}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === "personal"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
               Proxy Plan
                </button> */}
                {/* <button
                  onClick={() => setActiveTab("costume")}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === "personal"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
             Residential 
                </button> */}
              </div>
        
              {/* Content */}
              <div className="  rounded-xl text-white text-center shadow">
                {activeTab === "web" &&<FreeHttp /> }
                {/* {activeTab === "personal" && <ProxyPlan/>}
                {activeTab === "costume" && <Residetial/>} */}
              </div>
            </div>
    );
};

export default Proxy;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import WebsiteForm from "./manage-website/WebsiteForm";
import WebsiteList from "./manage-website/WebsiteList";



export default function ManageWebsite() {
  const [showForm, setShowForm] = useState(false);
  const [editingWebsite, setEditingWebsite] = useState(null);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Websites</h1>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
        onClick={() => {
          setEditingWebsite(null);
          setShowForm(true);
        }}>
          Add Website
        </button>
      </div>

      {showForm && (
        <WebsiteForm 
          editingWebsite={editingWebsite}
          onClose={() => {
            setShowForm(false);
            setEditingWebsite(null);
          }}
        />
      )}

      <WebsiteList
        
      />
    </div>
  );
}
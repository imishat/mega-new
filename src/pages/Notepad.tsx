// App.tsx or NotePad.tsx
import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "notepad_text";

export default function Notepad() {
  const [text, setText] = useState("");

  // Load saved note on mount
  useEffect(() => {
    const savedText = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedText) {
      setText(savedText);
    }
  }, []);

  // Save note to localStorage whenever text changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, text);
  }, [text]);

  return (
   <div className="w-full h-screen bg-gray-100 p-8">
  <div className="w-full h-full mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col">
    <h1 className="text-2xl font-bold mb-4">📝 My Notepad</h1>
    <textarea
      className="flex-grow w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Start typing your notes here..."
    />
    <button
      type="submit"
      className="mt-4 w-full cursor-pointer bg-blue-900 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Save
    </button>
  </div>
</div>

  );
}

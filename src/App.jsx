import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";
function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="App flex justify-center items-center h-[100vh]">
      <button
        className="m-4 px-4 py-2  bg-blue-500 text-white rounded"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        Save segment
      </button>
      {showSidebar && (
        <>
          <div className=" z-10 bg-black opacity-50 w-full h-full absolute"></div>
          <Sidebar onClose={() => setShowSidebar(false)} />
        </>
      )}
    </div>
  );
}

export default App;

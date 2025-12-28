import { useState } from "react";
import Sidebar from "./Sidebar"
import Header from "./Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
     const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);



  return (
      <div className="flex h-screen bg-gray-50">
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
              onClick={() => setSidebarOpen(false)}
            />
          )}
    
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
    
            <Outlet/>
          </div>
        </div>
  )
}

export default MainLayout
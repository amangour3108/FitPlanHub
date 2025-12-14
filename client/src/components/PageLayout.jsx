import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { getUser } from "../utils/auth";

function PageLayout() {
  
  const user = getUser();

  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="h-screen flex flex-col">
      
      {/* Navbar - full width */}
      <Navbar />

      {/* Below navbar */}
      <div className="flex flex-1">
        
        {/* Sidebar */}
        <div className="w-1/8 bg-white hidden md:block">
          <Sidebar user={user} />
        </div>

        {/* Main content */}
        <div className="flex-1 bg-gray-100 p-4 overflow-y-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default PageLayout;

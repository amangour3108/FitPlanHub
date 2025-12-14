import { useNavigate } from "react-router-dom"
import { logout, getUser } from "../utils/auth"

function Navbar() {
  const navigate = useNavigate();
  const user = getUser();  

  const handleLogout = () => {
    logout();
    navigate("/login");
  }

  return (
    <div className="h-14 bg-white flex justify-between items-center px-6">
      <h1 className="text-3xl font-semibold cursor-pointer" onClick={()=>navigate("/")}>FitPlanHub</h1>

      {user && (

        <>
        <h1 className="text-xl text-blue-600">Welcome, {user.name} !</h1>
        <button onClick={handleLogout} className="text-red-500">
          Logout
        </button></>
      )}
    </div>
  )
}

export default Navbar

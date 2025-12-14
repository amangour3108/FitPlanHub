import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { saveUser } from "../utils/auth"
import Navbar from "../components/Navbar"

function Login() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const submitForm = async (data) => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await res.json()

    if (res.ok) {
      saveUser(result)
      if (result.role === "user") {navigate("/feed")}
      else {navigate("/dashboard")}
    } else {
      alert(result.message)
    }
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(submitForm)} className="bg-white p-6 w-80">
        <h2 className="mb-4 font-semibold">Login</h2>

        <input className="border p-2 w-full mb-3" placeholder="Email" {...register("email")} />
        <input className="border p-2 w-full mb-4" type="password" placeholder="Password" {...register("password")} />
        <p>Don't have an account?<span className='text-blue-600 hover:cursor-pointer' onClick={()=>navigate("/signup")}>  Create one</span></p>
        <button className="bg-blue-600 text-white w-full p-2">Login</button>
        
      </form>
    </div>
    </>
  )
}

export default Login

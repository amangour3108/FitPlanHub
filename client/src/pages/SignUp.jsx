import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { saveUser } from "../utils/auth"
import Navbar from "../components/Navbar"

function SignUp() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const submitForm = async (data) => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await res.json()

    if (res.ok) {
      saveUser(result)
      navigate("/plans")
    } else {
      alert(result.message)
    }
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(submitForm)} className="bg-white p-6 w-80">
        <h2 className="mb-4 font-semibold">Sign Up</h2>

        <input className="border p-2 w-full mb-3" placeholder="Name" {...register("name")} />
        <input className="border p-2 w-full mb-3" placeholder="Email" {...register("email")} />
        <input className="border p-2 w-full mb-3" type="password" placeholder="Password" {...register("password")} />

        <select className="border p-2 w-full mb-4" {...register("role")}>
          <option value="user">User</option>
          <option value="trainer">Trainer</option>
        </select>
        <p>Already have an account?<span className='text-blue-600 hover:cursor-pointer' onClick={()=>navigate("/login")}>  Log In</span></p>
        <button className="bg-green-600 text-white w-full p-2">Create Account</button>
      </form>
    </div>
    </>
  )
}

export default SignUp

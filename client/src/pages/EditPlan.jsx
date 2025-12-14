import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { getUser } from "../utils/auth"

function EditPlan() {
  const { id } = useParams()
  const { register, handleSubmit, setValue } = useForm()
  const navigate = useNavigate()
  const user = getUser()

  // 🔹 block users
  if (user.role !== "trainer") {
    return <p className="p-4">Not allowed</p>
  }

  // 🔹 load plan data
  useEffect(() => {
    fetch(`http://localhost:5000/api/plans/${id}`)
      .then(res => res.json())
      .then(plan => {
        setValue("title", plan.title)
        setValue("description", plan.description)
        setValue("price", plan.price)
        setValue("duration", plan.duration)
      })
  }, [id])

  const submitForm = async (data) => {
    const res = await fetch(`http://localhost:5000/api/plans/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token
      },
      body: JSON.stringify(data)
    })

    if (res.ok) {
      alert("Plan updated")
      navigate("/dashboard") // ✅ redirect AFTER update
    } else {
      alert("Not allowed")
    }
  }

  return (
    <div className="flex justify-center h-full">
      <form onSubmit={handleSubmit(submitForm)} className="bg-white p-6 w-80">
        <h2 className="mb-4 font-semibold">Edit Plan</h2>

        <input className="border p-2 w-full mb-3" {...register("title")} />
        <textarea className="border p-2 w-full mb-3" {...register("description")} />
        <input className="border p-2 w-full mb-3" {...register("price")} />
        <input className="border p-2 w-full mb-4" {...register("duration")} />

        <button className="bg-blue-600 text-white w-full p-2">
          Update Plan
        </button>
      </form>
    </div>
  )
}

export default EditPlan

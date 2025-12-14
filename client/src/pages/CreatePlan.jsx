import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { getUser } from "../utils/auth"

function CreatePlan() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const navigate = useNavigate()
  const user = getUser()

  const fields = [
    { name: "title", placeholder: "Title" },
    { name: "description", placeholder: "Description", type: "textarea" },
    { name: "price", placeholder: "Price" },
    { name: "duration", placeholder: "Duration (eg. 30 days)" }
  ]

  const submitForm = async (data) => {
    const res = await fetch("http://localhost:5000/api/plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token
      },
      body: JSON.stringify(data)
    })

    const result = await res.json()

    if (res.ok) {
      console.log("Created Plan:", result)
      alert("Plan created successfully")
      navigate("/dashboard")
    } else {
      alert(result.message || "Something went wrong")
    }
  }

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <form onSubmit={handleSubmit(submitForm)} className="bg-white p-6 w-80">
        <h2 className="mb-4 font-semibold">Create Plan</h2>

        {fields.map((field) => (
          <div key={field.name}>
            {field.type === "textarea" ? (
              <textarea
                className="border p-2 w-full mb-1"
                placeholder={field.placeholder}
                {...register(field.name, {
                  required: `${field.placeholder} is required`
                })}
              />
            ) : (
              <input
                className="border p-2 w-full mb-1"
                placeholder={field.placeholder}
                {...register(field.name, {
                  required: `${field.placeholder} is required`
                })}
              />
            )}

            {errors[field.name] && (
              <p className="text-red-500 text-sm mb-2">
                {errors[field.name].message}
              </p>
            )}
          </div>
        ))}

        <button className="bg-green-600 text-white w-full p-2">
          Create Plan
        </button>
      </form>
    </div>
  )
}

export default CreatePlan

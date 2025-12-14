import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../components/Card"
import { getUser } from "../utils/auth"

function Plans() {
  const [plans, setPlans] = useState([])
  const navigate = useNavigate()
  const user = getUser()

  useEffect(() => {
    fetch("http://localhost:5000/api/plans", {
      headers: {
        Authorization: "Bearer " + user.token
      }
    })
      .then(res => res.json())
      .then(data => setPlans(data))
  }, [])

  const subscribe = async (id) => {
    await fetch(`http://localhost:5000/api/subscriptions/${id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + user.token
      }
    })

    setPlans(
      plans.map(p =>
        p._id === id ? { ...p, subscribed: true } : p
      )
    )
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return

    const res = await fetch(`http://localhost:5000/api/plans/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + user.token
      }
    })

    if (res.ok) {
      setPlans(plans.filter(p => p._id !== id))
    }
  }

  return (
    <div>
      <h2 className="mb-4 font-semibold">Plans</h2>

      {plans.length === 0 && <p>No plans available</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map(plan => (
          <Card key={plan._id}>
            <h3 className="font-medium">{plan.title}</h3>
            <p className="text-sm">Trainer: {plan.trainer?.name}</p>
            <p className="text-sm mb-2">₹{plan.price}</p>

            {/* View (everyone) */}
            <button
              className="text-blue-600 text-sm mr-3"
              onClick={() => navigate(`/plans/${plan._id}`)}
            >
              View
            </button>

            {/* User-only subscribe */}
            {user.role === "user" && (
              plan.subscribed ? (
                <p className="text-green-600 text-sm inline">
                  Subscribed
                </p>
              ) : (
                <button
                  className="text-blue-600 text-sm"
                  onClick={() => subscribe(plan._id)}
                >
                  Subscribe
                </button>
              )
            )}

            {/* Trainer-only actions */}
            {user.role === "trainer" && (
              <>
                <button
                  className="text-green-600 text-sm mr-3"
                  onClick={() =>
                    navigate(`/dashboard/edit-plan/${plan._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="text-red-600 text-sm"
                  onClick={() => handleDelete(plan._id)}
                >
                  Delete
                </button>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Plans

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function PlanDetails() {
  const { planId } = useParams()   // ✅ must be planId
  const [plan, setPlan] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/plans/${planId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Plan details:", data) // 👈 DEBUG
        setPlan(data)
      })
  }, [planId])

  if (!plan) {
    return <p>Loading plan...</p>
  }

  return (
    <div>
      <h2 className="font-semibold mb-2">{plan.title}</h2>
      <p className="mb-2">{plan.description}</p>
      <p>Trainer: {plan.trainer?.name}</p>
      <p>Price: ₹{plan.price}</p>
      <p>Duration: {plan.duration}</p>
    </div>
  )
}

export default PlanDetails

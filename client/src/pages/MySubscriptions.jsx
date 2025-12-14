import { useEffect, useState } from "react"
import Card from "../components/Card"
import { getUser } from "../utils/auth"

function MySubscriptions() {
  const [plans, setPlans] = useState([])
  const user = getUser()

  useEffect(() => {
    fetch("http://localhost:5000/api/subscriptions", {
      headers: {
        Authorization: "Bearer " + user.token
      }
    })
      .then(res => res.json())
      .then(data => setPlans(data))
  }, [])

  return (
    <div>
      <h2 className="mb-4 font-semibold">My Subscriptions</h2>

      {plans.map(item => (
        <Card key={item._id}>
          <h3 className="font-medium">{item.plan.title}</h3>
          <p className="text-sm">Duration: {item.plan.duration}</p>
        </Card>
      ))}
    </div>
  )
}

export default MySubscriptions

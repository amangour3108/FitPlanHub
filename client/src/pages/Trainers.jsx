import { useEffect, useState } from "react"
import Card from "../components/Card"
import { getUser } from "../utils/auth"

function Trainers() {
  const [trainers, setTrainers] = useState([])
  const user = getUser()

  useEffect(() => {
    fetch("http://localhost:5000/api/trainers", {
      headers: {
        Authorization: "Bearer " + user.token
      }
    })
      .then(res => res.json())
      .then(data => setTrainers(data))
  }, [])

  const followTrainer = async (id) => {
    await fetch(`http://localhost:5000/api/trainers/${id}/follow`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + user.token
      }
    })

    alert("Updated")
  }

  return (
    <div>
      <h2 className="mb-4 font-semibold">Trainers</h2>

      {trainers.map(trainer => (
        <Card key={trainer._id}>
          <h3 className="font-medium">{trainer.name}</h3>

          {trainer.following ? (
            <button className="text-red-600 text-sm">
              Unfollow
            </button>
          ) : (
            <button
              className="text-blue-600 text-sm"
              onClick={() => followTrainer(trainer._id)}
            >
              Follow
            </button>
          )}
        </Card>
      ))}
    </div>
  )
}

export default Trainers

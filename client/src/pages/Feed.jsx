import { useEffect, useState } from "react"
import Card from "../components/Card"
import { getUser } from "../utils/auth"

function Feed() {
  const [feed, setFeed] = useState([])
  const user = getUser()

  useEffect(() => {
    fetch("http://localhost:5000/api/feed", {
      headers: {
        Authorization: "Bearer " + user.token
      }
    })
      .then(res => res.json())
      .then(data => setFeed(data))
  }, [])

  return (
    <div>
      <h2 className="mb-4 font-semibold">Your Feed</h2>

      {feed.map(item => (
        <Card key={item._id}>
          <h3>{item.title}</h3>
          <p>Trainer: {item.trainer.name}</p>
          {item.subscribed && (
            <p className="text-green-600">Subscribed</p>
          )}
        </Card>
      ))}
    </div>
  )
}

export default Feed

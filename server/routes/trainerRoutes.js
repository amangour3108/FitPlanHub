import express from "express"
import protect from "../middleware/authMiddleware.js"
import User from "../models/User.js"

const router = express.Router()

// get trainers
router.get("/", protect, async (req, res) => {
  const trainers = await User.find({ role: "trainer" })

  const result = trainers.map(t => ({
    _id: t._id,
    name: t.name,
    following: req.user.following.includes(t._id)
  }))

  res.json(result)
})

// follow / unfollow
router.post("/:id/follow", protect, async (req, res) => {
  const trainerId = req.params.id

  const index = req.user.following.indexOf(trainerId)

  if (index === -1) {
    req.user.following.push(trainerId)
  } else {
    req.user.following.splice(index, 1)
  }

  await req.user.save()
  res.json({ message: "Updated" })
})

export default router

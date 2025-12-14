import express from "express"
import protect from "../middleware/authMiddleware.js"
import Subscription from "../models/Subscription.js"

const router = express.Router()

// subscribe
router.post("/:planId", protect, async (req, res) => {
  const exists = await Subscription.findOne({
    user: req.user._id,
    plan: req.params.planId
  })

  if (exists) {
    return res.json({ message: "Already subscribed" })
  }

  const sub = await Subscription.create({
    user: req.user._id,
    plan: req.params.planId
  })

  res.json(sub)
})

// get user subscriptions
router.get("/", protect, async (req, res) => {
  const subs = await Subscription.find({ user: req.user._id })
    .populate("plan")

  res.json(subs)
})

export default router

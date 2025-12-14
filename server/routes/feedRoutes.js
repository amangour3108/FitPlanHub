import express from "express"
import protect from "../middleware/authMiddleware.js"
import Plan from "../models/Plan.js"
import Subscription from "../models/Subscription.js"

const router = express.Router()

router.get("/", protect, async (req, res) => {
  const plans = await Plan.find({
    trainer: { $in: req.user.following }
  }).populate("trainer", "name")

  const subs = await Subscription.find({ user: req.user._id })
  const subIds = subs.map(s => s.plan.toString())

  const result = plans.map(p => ({
    ...p._doc,
    subscribed: subIds.includes(p._id.toString())
  }))

  res.json(result)
})

export default router

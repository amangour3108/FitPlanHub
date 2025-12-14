import express from "express"
import protect from "../middleware/authMiddleware.js"
import Plan from "../models/Plan.js"

const router = express.Router()

//GET ALL PLANS (public)
router.get("/", async (req, res) => {
  const plans = await Plan.find().populate("trainer", "name")
  res.json(plans)
})

// GET TRAINER'S OWN PLANS
router.get("/my", protect, async (req, res) => {
  if (req.user.role !== "trainer") {
    return res.status(403).json({ message: "Not allowed" })
  }

  const plans = await Plan.find({ trainer: req.user._id })
  res.json(plans)
})

// GET SINGLE PLAN DETAILS
router.get("/:id", async (req, res) => {
  const plan = await Plan.findById(req.params.id)
    .populate("trainer", "name")

  if (!plan) {
    return res.status(404).json({ message: "Plan not found" })
  }

  res.json(plan)
})

//CREATE PLAN (trainer only)
router.post("/", protect, async (req, res) => {
  if (req.user.role !== "trainer") {
    return res.status(403).json({ message: "Not allowed" })
  }

  const plan = await Plan.create({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    duration: req.body.duration,
    trainer: req.user._id
  })

  res.json(plan)
})

//EDIT PLAN (trainer only)
router.put("/:id", protect, async (req, res) => {
  if (req.user.role !== "trainer") {
    return res.status(403).json({ message: "Not allowed" })
  }

  const plan = await Plan.findById(req.params.id)

  if (!plan) {
    return res.status(404).json({ message: "Plan not found" })
  }

  if (plan.trainer.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not your plan" })
  }

  plan.title = req.body.title
  plan.description = req.body.description
  plan.price = req.body.price
  plan.duration = req.body.duration

  const updatedPlan = await plan.save()
  res.json(updatedPlan)
})

//DELETE PLAN (trainer only)
router.delete("/:id", protect, async (req, res) => {
  if (req.user.role !== "trainer") {
    return res.status(403).json({ message: "Not allowed" })
  }

  const plan = await Plan.findById(req.params.id)

  if (!plan) {
    return res.status(404).json({ message: "Plan not found" })
  }

  if (plan.trainer.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not your plan" })
  }

  await plan.deleteOne()
  res.json({ message: "Plan deleted" })
})

export default router

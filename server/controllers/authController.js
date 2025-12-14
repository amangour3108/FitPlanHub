import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// SIGNUP
export const signup = async (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  const role = req.body.role

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

  res.json({
    id: user._id,
    name: user.name,
    role: user.role,
    token
  })
}

// LOGIN
export const login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" })
  }

  const isCorrect = await bcrypt.compare(password, user.password)
  if (!isCorrect) {
    return res.status(400).json({ message: "Invalid email or password" })
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

  res.json({
    id: user._id,
    name: user.name,
    role: user.role,
    token
  })
}

const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Admin = require('../models/admin')

router.post("/login", async (req, res) => {
  const admin = await Admin.findOne({ where: { email: req.body.email, password: req.body.password } })

  if (!admin) return res.status(400).send("Wrong credentials")

  res.send(admin)
})

router.get("/users", async (req, res) => {
  const users = await User.findAll({})

  res.send(users)
})

router.post("/verify/:id", async (req, res) => {
  if (!req.params.id) return res.status(400).send("Provide ID")

  const user = await User.findOne({ where: { id: req.params.id } })

  if (!user) return res.status(400).send("No user found")
  if (user.status === 'verified') res.status(400).send("Already verified")

  const updatedUser = await User.update(
    { status: 'verified' },
    { where: { id: req.params.id } }
  )

  res.send(updatedUser)
})

module.exports = router
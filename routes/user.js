const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.post("/login", async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email, password: req.body.password } })

  if (!user) return res.status(400).send("Wrong credentials")

  res.send(user)
})

router.post("/signup", async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).send('Missing required fields')

  const existingUser = await User.findOne({ where: { email } })
  if (existingUser) return res.status(400).send('Email used has been registered')

  const data = {
    email,
    password,
  }

  const user = await User.create(data)
  res.send(user)
})

router.get("/:id", async (req, res) => {
  if (!req.params.id) return res.status(400).send("Provide ID")

  const user = await User.findOne({ where: { id: req.params.id } })

  if (!user) return res.status(400).send("No user found")
  res.send(user)
})

module.exports = router
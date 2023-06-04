const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Admin = require('../models/admin')

router.get("/", (req, res) => {
  res.send('Base admin route')
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) return res.status(400).send('Wrong credentials')

  const admin = await Admin.findOne({ where: { email, password } })

  if (!admin) return res.status(400).send("Wrong credentials")

  res.send(admin)
})

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body

  if (!email || !password || !name) return res.status(400).send('Missing required fields')

  const existingAdmin = await Admin.findOne({ where: { email } })
  if (existingAdmin) return res.status(400).send('Email used has been registered')

  const data = {
    name,
    email,
    password,
  }

  const admin = await Admin.create(data)
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
  if (user.status === 'VERIFIED') res.status(400).send("Already verified")

  const updatedUser = await User.update(
    {
      status: 'VERIFIED'
    }, {
    where: {
      id: req.params.id,
    }
  })

  res.send(updatedUser)
})

module.exports = router
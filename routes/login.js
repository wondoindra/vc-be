const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Admin = require('../models/admin')

router.post("/login", async (req, res) => {
  const { email, password, method } = req.body

  if (!email || !password || !method) return res.status(400).send('Wrong credentials')

  let user

  if (method === 'USER') {
    user = await User.findOne({ where: { email, password } })

    if (!user) return res.status(400).send("Wrong credentials")

    if (user.status !== 'VERIFIED') return res.status(400).send("User not yet approved")

  } else if (method === 'ADMIN') {
    user = await Admin.findOne({ where: { email, password } })

    if (!user) return res.status(400).send("Wrong credentials")
  }

  res.send(user)
})

module.exports = router
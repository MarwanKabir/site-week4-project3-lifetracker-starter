"use strict"

/** Routes for authentication. */

const express = require("express")
const User = require("../models/users")
const router = express.Router()

router.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body)
    const token = User.generateAuthToken(user)
    return res.status(200).json({ user, token })
  } catch (err) {
    next(err)
  }
})

router.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body)
    return res.status(201).json({ user })
  } catch (err) {
    next(err)
  }
})

module.exports = router
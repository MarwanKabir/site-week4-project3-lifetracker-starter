"use strict"

const db = require("../db")
const bcrypt = require("bcrypt")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const { validateFields } = require("../utils/validate")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const secretKey = "Thierferferfreferf"

const { BCRYPT_WORK_FACTOR } = require("../config")

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {User} user - user from database
   * @returns public user
   */
  static _createPublicUser(user) {
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      username: user.username
    }
  }

  /**
   * Authenticate user with email and password.
   *
   * Throws UnauthorizedError if user not found or wrong password.
   *
   * @returns user
   **/
  static generateAuthToken (user){
    console.log("THIS IS THE USER", user)
    const payload = {
      id: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email
    }
    

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' })
    return token
  }
  static verifyAuthToken(token){
    try {
        const verify = jwt.verify(token, secretKey)
        console.log("This is verify", verify)
        if(verify){
          return jwt.decode(token)
        }
        return null
    } catch (err) {
      console.log(err)
        return null
    }
  }
  static async authenticate(creds) {
    const { email, password } = creds
    const requiredCreds = ["email", "password"]
    try {
      validateFields({ required: requiredCreds, obj: creds, location: "user authentication" })
    } catch (err) {
      throw err
    }

    
    const user = await User.fetchUserByEmail(email)
    console.log(user)

    if (user) {
      // compare hashed password to a new hash from password
      console.log(password)
      console.log(user.password)
      const isValid = await bcrypt.compare(password, user.password)
      console.log("isValid:", isValid)
      if (isValid === true) {
        return User._createPublicUser(user)
      }
    }

    throw new UnauthorizedError("Invalid username/password")
  }

  /**
   * Register user with data.
   *
   * Throws BadRequestError on duplicates.
   *
   * @returns user
   **/

  static async register(creds) {
    const { email, password, firstName, lastName } = creds
    const username = firstName + lastName
    const requiredCreds = ["email", "password", "firstName", "lastName", "username"]
    console.log(username)
    try {
      validateFields({ required: requiredCreds, obj: {...creds, username: username}, location: "user registration" })
    } catch (err) {
      console.log("THIS ERROR")
      throw err
    }

    const existingUserWithEmail = await User.fetchUserByEmail(email)
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`)
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    const normalizedEmail = email.toLowerCase()

    const result = await db.query(
      `INSERT INTO users (
          password,
          first_name,
          last_name,
          email,
          created_at,
          updated_at,
          username
        )
        VALUES ($1, $2, $3, $4, to_timestamp($5), to_timestamp($6), $7)
        RETURNING email,            
                  first_name AS "firstName", 
                  last_name AS "lastName",
                  created_at AS "createdAt",
                  updated_at,
                  username
                  `,
      [hashedPassword, firstName, lastName, normalizedEmail, Date.now()/1000, Date.now()/1000, username]
    )

    const user = result.rows[0]

    return user
  }

  /**
   * Fetch a user in the database by email
   *
   * @param {String} email
   * @returns user
   */
  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT * FROM users
           WHERE email = $1`,
      [email?.toLowerCase()]
    )
    console.log("This is the result", result)
    const user = result.rows[0]

    return user
  }
  static async addWorkout(info) {
    const { name, category, duration, intensity, token} = info
    const email = User.verifyAuthToken(token).email
    const user = await User.fetchUserByEmail(email)

    try {
      // Inserting the workout data into the workouts table
      const result = await db.query(
        `INSERT INTO workouts (name, category, duration, intensity, worktime, user_id)
         VALUES ($1, $2, $3, $4, to_timestamp($5), $6)
         RETURNING *`,
        [name, category, duration, intensity, Date.now()/1000, user.id]
      )

      // Retrieve the inserted workout from the result
      const workout = result.rows

      const filteredResult = await db.query(
        `SELECT * FROM workouts WHERE user_id = $1`,
        [user.id]
      )

      const filteredWorkout = filteredResult.rows

      return filteredWorkout

    } catch (err) {
      throw err
    }
  }
  static async getAllWorkouts(token){
    const email = User.verifyAuthToken(token).email
    console.log("THIS IS THE EMAIL",email)
    const user = await User.fetchUserByEmail(email)
    const filteredResult = await db.query(
      `SELECT * FROM workouts WHERE user_id = $1`,
      [user.id]
    )
    return filteredResult.rows
  }
}

module.exports = User
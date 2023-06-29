"use strict"

describe("config can come from env", function () {
  test("works", function () {
    process.env.SECRET_KEY = "WEFHWLKEWLEKFJWLEKFJWLEKFHWELFHWEJNDLKEFNL2ECNL2K3FN"
    process.env.SERVER_PORT = "3001"
    process.env.DATABASE_URL = "other"
    process.env.NODE_ENV = "other"

    const config = require("./config")
    expect(config.SECRET_KEY).toEqual("WEFHWLKEWLEKFJWLEKFJWLEKFHWELFHWEJNDLKEFNL2ECNL2K3FN")
    expect(config.SERVER_PORT).toEqual(3001)
    expect(config.getDatabaseUri()).toEqual("other")
    expect(config.BCRYPT_WORK_FACTOR).toEqual(13)

    delete process.env.SECRET_KEY
    delete process.env.SERVER_PORT
    delete process.env.BCRYPT_WORK_FACTOR
    delete process.env.DATABASE_URL

    expect(config.getDatabaseUri()).toEqual("airbnb")
    process.env.NODE_ENV = "test"
    expect(config.getDatabaseUri()).toEqual("airbnb_test")
  })
})
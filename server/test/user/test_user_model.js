require("dotenv").config();
process.env.NODE_ENV = "test";

const assert = require("assert");

// const app = require("../server");

const { User } = require("../../models");

const mongoose = require("mongoose");

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const validUserObject = {
  firstName: "Mocha",
  lastname: "test",
  username: "mochatest",
  email: "testing@test.com",
  password: "testTest123$",
  role: "Personal"
};

// Model Testing
describe("User model creation testing", () => {
  before(async () => {
    const dbTestUrl = process.env.TEST_DB;
    mongoose
      .connect(dbTestUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(() => console.log("Database connected!"))
      .catch(err => console.log(err));
    await User.deleteMany();
  });

  // Clears the db so we can keep testing.
  afterEach(async () => {
    await User.deleteMany();
  });

  it("Test user creation with valid email and password", async () => {
    try {
      const user = await User.create(validUserObject).catch(err => {
        console.log(err);
      });

      await user.save();
      assert(!user.isNew);
    } catch (error) {
      console.log(error);
    }
  });

  it("Test user creation with invalid email", async () => {
    let e = null;

    try {
      const user = await User.create({
        firstName: "Mocha",
        lastname: "test",
        username: "mochatest",
        email: "testing@.com",
        password: "testTest123$",
        role: "Personal"
      });

      await user.validate();
    } catch (error) {
      e = error;
    }

    chai.assert.isNotNull(e, "Error should not be null");
  });

  it("Test user creation with invalid password", async () => {
    let e = null;

    try {
      const user = await User.create({
        firstName: "Mocha",
        lastname: "test",
        username: "mochatest",
        email: "testing@test.com$",
        password: "asdf",
        role: "Personal"
      });

      await user.validate();
    } catch (error) {
      e = error;
    }

    chai.assert.isNotNull(e, "Error should not be null");
  });

  it("Should be able to find user in db after they've been created.", async () => {
    try {
      const user = await User.create(validUserObject).catch(err => {
        console.log(err);
      });

      const secondUser = await User.create({
        firstName: "Mocha",
        lastname: "test",
        username: "mochatest2",
        email: "testing2@test.com",
        password: "testTest123$",
        role: "Personal"
      }).catch(err => console.log(err));

      const findUser = await User.findOne({ _id: user._id });

      assert.deepStrictEqual(user._id, findUser._id);
      assert.notDeepStrictEqual(secondUser._id, findUser._id);
    } catch (error) {
      console.log(error);
    }
  });
});

describe("User model read, update, and delete testing", () => {
  before(async () => {
    const dbTestUrl = process.env.TEST_DB;
    mongoose
      .connect(dbTestUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(() => console.log("Database connected!"))
      .catch(err => console.log(err));
    await User.deleteMany();

    const user = await User.create({
      firstName: "Mocha",
      lastname: "test",
      username: "mochatest",
      email: "testing@test.com",
      password: "testTest123$",
      role: "Personal"
    }).catch(err => console.log(err));

    await user.save();
  });

  // Clears the db so we can keep testing.
  afterEach(async () => {
    await User.deleteMany();
  });
});

require("dotenv").config();
process.env.NODE_ENV = "test";

// const app = require("../server");

const { User } = require("../../models");

const mongoose = require("mongoose");

const chai = require("chai");
const chaiHttp = require("chai-http");
const { assert, expect } = require("chai");

chai.use(chaiHttp);

const validUserObject = {
  firstName: "Mocha",
  lastname: "test",
  username: "mochatest",
  email: "testing@test.com",
  password: "testTest123$",
  role: "Personal"
};

describe("User Model Testing", () => {
  before(async () => {
    try {
      const dbTestUrl = process.env.TEST_DB;
      await mongoose.connect(dbTestUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
    } catch (error) {
      throw new Error(err.message);
    }
  });

  // Clears the db so we can keep testing.
  after(async () => {
    await User.deleteMany();
  });

  describe("User Create Testing", () => {
    before(async () => {
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

    it("Test failed user creation with invalid email", async () => {
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

    it("Test failed user creation with invalid password", async () => {
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

    it("Test failed user creation with no first name", () => {
      const user = new User({
        firstName: "",
        lastname: "test",
        username: "mochatest",
        email: "testing@test.com$",
        password: "testTest123$",
        role: "Personal"
      });

      user.validate(err => {
        expect(err).to.not.be.null;
      });
    });

    it("Test failed user creation with no last name", () => {
      const user = new User({
        firstName: "Mocha",
        lastname: "",
        username: "mochatest",
        email: "testing@test.com$",
        password: "testTest123$",
        role: "Personal"
      });

      user.validate(err => {
        expect(err).to.not.be.null;
      });
    });
  });

  describe("User Read Testing", () => {
    before(async () => {
      await User.deleteMany();

      await User.create({
        firstName: "Mocha",
        lastname: "test",
        username: "mochatest",
        email: "testing@test.com",
        password: "testTest123$",
        role: "Personal"
      }).catch(err => console.log(err));
    });

    it("Test finding user in db after they've been created.", async () => {
      try {
        const user = await User.findOne({ username: "mochatest" });

        chai.assert.isObject(user);
      } catch (error) {
        throw new Error(error.message);
      }
    });
  });

  describe("User Update Testing", () => {
    before(async () => {
      await User.deleteMany();

      await User.create({
        firstName: "Mocha",
        lastname: "test",
        username: "mochatest",
        email: "testing@test.com",
        password: "testTest123$",
        role: "Personal"
      }).catch(err => {
        throw new Error(err.message);
      });
    });

    it("Test updating firstName", async () => {
      const updateFirstName = { firstName: "updated" };
      await User.updateOne({ username: "mochatest" }, updateFirstName);

      const updatedUser = await User.findOne({ username: "mochatest" });

      expect(updatedUser.firstName).to.equal("updated");
    });

    it("Test failed update with invalid email", async () => {
      const updateEmail = { email: "updated" };
      const opts = { runValidators: true };
      await User.updateOne({ username: "mochatest" }, updateEmail, opts).catch(
        err => {
          expect(err.name).to.be.equal("ValidationError");
        }
      );

      const updatedUser = await User.findOne({ username: "mochatest" });

      expect(updatedUser.email).to.not.equal(updateEmail.email);
    });

    it("Test failed update with invalid password", async () => {
      let error = null;
      const updatePassword = { password: "updated" };
      const opts = { runValidators: true };
      await User.updateOne(
        { username: "mochatest" },
        updatePassword,
        opts
      ).catch(err => {
        error = err;
        expect(err.name).to.be.equal("ValidationError");
      });

      expect(error).to.not.be.null;
    });
  });
});

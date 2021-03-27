const { User } = require("../models");
const { createPassword } = require("../config/bcrypt.js");

const cloudinary = require("../../utils/cloudinary");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .select(
          "firstName lastname username email role profileImg bannerImg following followers posts bio causes"
        )
        .populate([
          {
            path: "following",
            select: "firstName",
            model: "User"
          },
          {
            path: "followers",
            select: "firstName",
            model: "User"
          },
          {
            path: "posts",
            model: "Post",
            options: { sort: { date: -1 } },
            populate: [
              {
                path: "author",
                select: "firstName",
                model: "User"
              },
              {
                path: "likes",
                select: "firstName",
                model: "User"
              },
              {
                path: "hashtags",
                model: "Hashtag"
              },
              {
                path: "comments",
                model: "Comment",
                options: { sort: { date: -1 } },
                populate: [
                  {
                    path: "user",
                    select: "firstName",
                    model: "User"
                  }
                ]
              }
            ]
          },
          {
            path: "causes",
            model: "Cause",
            options: { sort: { date: -1 } },
            populate: [
              {
                path: "author",
                select: "firstName",
                model: "User"
              },
              {
                path: "likes",
                select: "firstName",
                model: "User"
              }
            ]
          }
        ])
        .exec();
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },
  findIfUserLikesCause: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .select("causes")
        .exec();

      const found = user.causes.find(
        element => element.toString() === req.params.causeId.toString()
      );

      if (found) {
        return res.status(200).json(true);
      }

      res.status(200).json(false);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },
  updateUser: async (req, res) => {
    console.log(req.params.id);
    try {
      const { password, profileImg } = req.body;
      const updateUser = req.body;

      if (password) {
        updateUser.password = await createPassword(password);
      }

      if (profileImg) {
        const result = await cloudinary.uploader.upload_large(profileImg, {
          // eslint-disable-next-line camelcase
          upload_preset: "dev_setup"
        });
        updateUser.profileImg = result.public_id.toString();
      }
      console.log(updateUser);

      const foundUser = await User.updateOne(
        {
          _id: req.params.id
        },
        {
          $set: { updateUser }
        },
        { new: true, runValidators: true }
      );
      console.log(foundUser);
      res.status(200).json(foundUser.firstName);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndRemove({ _id: req.params.id });
      res.status(200).json(deletedUser);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  updatePassword: async () => {
    const hash = await createPassword(req.body.password);
    try {
      await User.findOneAndUpdate({ _id: req.params.id }, { password: hash });
      res.status(200).json(causeModel);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};

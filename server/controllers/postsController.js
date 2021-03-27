const { Post } = require("../models");
// const { populate } = require("../models/cause");

const cloudinary = require("../../utils/cloudinary");

module.exports = {
  findUserPosts: async (req, res) => {
    try {
      const postModel = await Post.findById(req.query).sort({ date: -1 });
      res.json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  create: async ({ body }, res) => {
    const { title, content, imageUrl, author, hashtags } = body;
    try {
      let img = "";
      if (imageUrl) {
        const result = await cloudinary.uploader.upload_large(imageUrl, {
          // eslint-disable-next-line camelcase
          upload_preset: "dev_setup"
        });
        img = result.public_id;
      }

      const postModel = await Post.create({
        title,
        content,
        imageUrl: img,
        author,
        hashtags
      });
      res.status(201).json(postModel);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },
  update: async (req, res) => {
    const { imageUrl } = req.body;
    const upDatePost = req.body;

    if (imageUrl) {
      const result = await cloudinary.uploader.upload_large(profileImg, {
        // eslint-disable-next-line camelcase
        upload_preset: "dev_setup"
      });
      upDatePost.imageUrl = result.public_id;
    }
    try {
      const postModel = await Post.findByIdAndUpdate(
        req.params.id,
        {
          upDatePost
        },
        { new: true, runValidators: true }
      );

      res.status(200).json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  updateObjectID: async (req, res) => {
    console.log(req.body);
    try {
      const postModel = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $push: req.body
        },

        { new: true, runValidators: true }
      );

      res.status(200).json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  remove: async (req, res) => {
    try {
      const postModel = await Post.findByIdAndDelete({ _id: req.params.id });
      //const deleteModel = await postModel.remove();
      res.status(200).json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  },
  getAllPost: async (req, res) => {
    try {
      const allPost = await Post.find({})
        .sort({ date: -1 })
        .populate([
          {
            path: "author",
            select: "firstName",
            model: "User"
          },
          {
            path: "hashtags",
            model: "Hashtag"
          },
          {
            path: "likes",
            select: "firstName",
            model: "User"
          },
          {
            path: "comments",
            model: "Comment",
            options: { sort: { date: -1 } },
            populate: {
              path: "user",
              select: "firstName",
              model: "User"
            }
          }
        ])
        .exec();
      res.status(200).json(allPost);
    } catch (err) {
      console.log(err);
      res.status(422).json(err);
    }
  },
  removeliked: async (req, res) => {
    console.log(req.body);
    try {
      const postModel = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $pull: req.body
        },

        { new: true, runValidators: true }
      );

      res.status(200).json(postModel);
    } catch (err) {
      res.status(422).json(err);
    }
  }
};

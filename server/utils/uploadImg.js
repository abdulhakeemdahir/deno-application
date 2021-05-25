/* eslint-disable camelcase */
const cloudinary = require("./cloudinary");

const uploadImage = async imageUrl => {
  const { public_id } = await cloudinary.uploader.upload_large(imageUrl, {
    // eslint-disable-next-line camelcase
    upload_preset: "dev_setup"
  });

  return public_id;
};

module.exports = uploadImage;

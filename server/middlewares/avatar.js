import cloudinary from "../utils/cloudinary.js";

export const uploadAvatar = async (req, res, next) => {
  try {
    const avatar  = req.file;
    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: "NO Image Provides",
      });
    }

    const base64 = `data:${avatar.mimetype};base64,${avatar.buffer.toString(
      "base64"
    )}`;
    const result = await cloudinary.uploader.upload(base64, {
      folder: "avatars",
    });

    req.avatar = result;
    next();
  } catch (error) {
    console.log("Upload Avatar Error: ", error.message || error);
    res.status(500).json({
      success: false,
      message: "Cloudinary Error",
    });
  }
};

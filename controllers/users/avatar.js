const cloudinary = require('../../lib/cloudinary');
const UserSchema = require('../../models/UserSchema');

module.exports = async (req, res) => {
  const image = await cloudinary.uploader.upload(req.file.path);
  const user = await UserSchema.findByIdAndUpdate(
    req.user._id,
    { avatar: image.url },
    { new: true },
  );
  res.status(200).json({
    resolved: true,
    data: user,
  });
}
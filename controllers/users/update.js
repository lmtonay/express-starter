const UserSchema = require("../../models/UserSchema");

module.exports = (req, res) => {
  UserSchema.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).json({
          resolved: false,
          error: err,
        });
      } else {
        res.status(200).json({
          resolved: true,
          data: user,
        });
      }
    },
  );
}
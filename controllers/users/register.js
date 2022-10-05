const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = require('../../models/UserSchema');

module.exports = async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    const user = await UserSchema.findOne({ email });

    if (user) {
      res.status(409).json({ resolved: false, error: 'Email is already taken' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new UserSchema({
        name,
        email,
        username,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);

      res.status(201).json({
        resolved: true,
        message: 'User created successfully',
        data: {
          token,
        }
      });
    }
  } catch (error) {
    res.status(500).json({ resolved: false, error: error.message });
  }
};
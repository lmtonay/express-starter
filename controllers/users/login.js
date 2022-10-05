const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserSchema = require('../../models/UserSchema');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserSchema.findOne({ email });

    if (!user) {
      res.status(404).json({ resolved: false, error: 'User not found' });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(401).json({ resolved: false, error: 'Invalid credentials' });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({
          resolved: true,
          message: 'User logged in successfully',
          data: {
            token,
          }
        });
      }
    }
  } catch (error) {
    res.status(500).json({ resolved: false, error: error.message });
  }
}
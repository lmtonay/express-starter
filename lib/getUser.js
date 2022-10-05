const jwt = require('jsonwebtoken');
const UserSchema = require('../models/UserSchema');

async function getUser(token) {
  const user = await jwt.verify(
    token,
    process.env.JWT_SECRET,
    async (err, authData) => {
      if (err) {
        return null;
      }
      const u = await UserSchema.findById(authData.id);
      return u;
    },
  );

  return user;
}

module.exports = getUser;

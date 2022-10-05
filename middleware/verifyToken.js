const getUser = require('../lib/getUser');

const verifyToken = async (req, res, next) => {
  // eslint-disable-next-line dot-notation
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(401).json({ resolved: false, error: 'Unauthorized' });
  } else {
    req.token = token;
    const user = await getUser(token);
    req.user = user;
    next();
  }
};

module.exports = verifyToken;

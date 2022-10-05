module.exports = async (req, res) => {
  res.status(200).json({
    resolved: true,
    data: {
      user: req.user,
    },
  });
}
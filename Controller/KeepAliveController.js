module.exports.keepAlive = (req, res) => {
  res.status(200).json({
    message: 'Keep Alive',
  });
};
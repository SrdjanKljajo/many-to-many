const notFound = (req, res) =>
  res.status(404).json({
    success: 'fail',
    msg: 'Route does not exist',
  })

module.exports = notFound

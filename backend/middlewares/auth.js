const { checkToken } = require('../config/tokenservice')
function checkAuthorization(req, res, next) {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'token not found unauthorized' })
  }
  const user = checkToken(token)
  req.user = user
  console.log(user)
  next()
}

module.exports = checkAuthorization

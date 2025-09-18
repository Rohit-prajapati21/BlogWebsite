const jwt = require('jsonwebtoken')
const key = 'rohihit#$@&^T^T&#*(#)(*)UJjcbjsb'

function generateToken(user) {
  const payload = {
    fullName: user.fullName,
    email: user.email,
    id: user._id,
  }
  return jwt.sign(payload, key, { expiresIn: '1h' })
}

function checkToken(token) {
  try {
    return jwt.verify(token, key)
  } catch (error) {
    return null
  }
}

module.exports = {
  generateToken,
  checkToken,
}

const bcrypt = require('bcrypt')

async function passwordhash(password) {
  const saltRound = 10
  const passwordHashed = await bcrypt.hash(password, saltRound)
  return passwordHashed
}

async function checkPassword(plainPassword, hashPassword) {
  const isMatch = await bcrypt.compare(plainPassword, hashPassword)
  return isMatch
}

module.exports = {
  passwordhash,
  checkPassword,
}

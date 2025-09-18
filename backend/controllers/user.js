const { passwordhash, checkPassword } = require('../config/securepassword')
const { generateToken } = require('../config/tokenservice')
const User = require('../models/user')

async function signUpHandler(req, res) {
  const { fullName, gender, password, email } = req.body
  try {
    const passwordHashed = await passwordhash(password)

    const user = await User.create({
      fullName,
      gender,
      password: passwordHashed,
      email,
    })
    return res.status(201).json({ message: 'user is registered successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'somethig went wrong', error })
  }
}

async function loginHandler(req, res) {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'invalid email' })
    }
    const isMatch = await checkPassword(password, user.password)

    if (!isMatch) {
      return res.status(404).json({ message: 'invalid password' })
    }

    const token = generateToken(user, {
      httpOnly: true,
      sameSite: 'strict',
    })

    res.cookie('token', token)
    return res.status(200).json({
      message: 'user is logged in',
      userData: {
        fullName: user.fullName,
        gender: user.gender,
        email: user.email,
        id: user._id,
      },
    })
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong', error })
  }
}

async function updateUserHandler(req, res) {
  const { id } = req.user

  if (Object.keys(req.body).includes('password')) {
    const passwordHashed = await passwordhash(req.body.password)
    req.body.password = passwordHashed
  }

  try {
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    })
    const token = generateToken(user, {
      httpOnly: true,
      sameSite: 'strict',
    })

    res.cookie('token', token)
    return res.status(200).json({
      fullName: user.fullName,
      gender: user.gender,
      email: user.email,
      id: user._id,
    })
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong', error })
  }
}

async function logoutHandler(req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  })
  return res.status(200).json({ message: 'user is loggedout' })
}

module.exports = {
  signUpHandler,
  loginHandler,
  updateUserHandler,
  logoutHandler,
}

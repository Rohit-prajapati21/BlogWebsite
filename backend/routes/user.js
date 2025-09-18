const express = require('express')
const router = express.Router()
const checkAuthorization = require('../middlewares/auth')
const {
  signUpHandler,
  loginHandler,
  updateUserHandler,
  logoutHandler,
} = require('../controllers/user')

router.post('/sign-up', signUpHandler)
router.post('/login', loginHandler)
router.put('/update', checkAuthorization, updateUserHandler)
router.post('/logout', logoutHandler)

module.exports = router

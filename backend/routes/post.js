const express = require('express')
const router = express.Router()
const upload = require('../middlewares/img')
const {
  createPostHandler,
  allPostsHandler,
  updatePostHandler,
  userPostsHandler,
  deletePostHandler,
  postLikeHandler,
  postCommentHandler,
} = require('../controllers/post')

const checkAuthorization = require('../middlewares/auth')

router.get('/', allPostsHandler)
router.get('/user-post', userPostsHandler)
router.post('/create', upload.single('image'), createPostHandler)
router.put('/update/:id', updatePostHandler)
router.delete('/delete/:id', deletePostHandler)
router.put('/like/:id', postLikeHandler)
router.post('/comment', postCommentHandler)
module.exports = router

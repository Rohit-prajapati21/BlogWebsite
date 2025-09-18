const Post = require('../models/post')
// const { findById } = require('../models/user')

async function createPostHandler(req, res) {
  const { title, type, body, tags } = req.body

  try {
    const post = await Post.create({
      title,
      body,
      type,
      user: req.user.id,
      tags,
      image: req.file.filename,
    })
    return res.status(201).json({ message: 'post is created', post })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: 'something went wrong', error })
  }
}

async function allPostsHandler(req, res) {
  try {
    const posts = await Post.find({}).populate('user')
    const modifyPosts = []
    for (let post of posts) {
      const { user, ...postData } = post.toObject()
      modifyPosts.push({
        fullName: user.fullName,
        postData,
      })
    }
    return res.status(200).json(modifyPosts)
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong', error })
  }
}
async function updatePostHandler(req, res) {
  const { id } = req.params

  try {
    const post = await Post.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    })
    if (!post) {
      return res.status(404).json({ message: 'post not found' })
    }
    return res.status(200).json({ message: 'post is updated', post })
  } catch (error) {
    return res.status(500).json({ message: 'something is wrong', error })
  }
}

async function userPostsHandler(req, res) {
  const { id } = req.user

  try {
    const userPosts = await Post.find({ user: id })

    if (!userPosts) {
      return res.status(404).json({ message: 'post not found' })
    }
    return res.status(200).json(userPosts)
  } catch (error) {
    return res.status(500).json({ message: 'something is wrong', error })
  }
}

async function deletePostHandler(req, res) {
  const { id } = req.params
  try {
    const post = await Post.findByIdAndDelete({ _id: id })
    if (!post) {
      return res.status(404).json({ message: 'post not found' })
    }
    return res.status(200).json({ message: 'post is deleted', post })
  } catch (error) {
    return res.status(500).json({ message: 'something is wrong', error })
  }
}

async function postLikeHandler(req, res) {
  console.log('pp', req.params.id)
  console.log('yuu', req.user.id)

  const { id } = req.params
  const postId = id
  let userId = req.user.id

  try {
    const post = await Post.findById(postId)

    let { likeByUser, count } = post.likes
    console.log('before', count)
    const isUser = likeByUser.some((user) => user.equals(userId))

    if (isUser) {
      console.log('hlo')
      count -= 1
      likeByUser = likeByUser.filter((user) => !user.equals(userId))
    } else {
      count += 1
      likeByUser.push(userId)
    }

    const postLiked = await Post.findByIdAndUpdate(
      { _id: postId },
      { 'likes.count': count, 'likes.likeByUser': likeByUser },
      {
        new: true,
      }
    )

    return res.status(200).json({ message: 'post is liked', postLiked })
  } catch (error) {
    return res.status(500).json({ message: 'something is wrong', error })
  }
}

async function postCommentHandler(req, res) {
  const { postId, comment } = req.body
  console.log(req.user.fullName)
  try {
    if (!comment || comment.trim() === '') {
      return res.status(400).json({ message: 'text is required' })
    }

    const post = await Post.findById(postId)
    const commentData = {
      commentBy: req.user.fullName,
      comment,
    }
    post.comments.push(commentData)
    const postCommented = await post.save()
    return res.status(201).json({ message: 'comment is added', postCommented })
  } catch (error) {
    console.log(error.message)
    console.log(error.message)
    return res.status(500).json({ message: 'something is wrong', error })
  }
}

module.exports = {
  createPostHandler,
  allPostsHandler,
  updatePostHandler,
  userPostsHandler,
  deletePostHandler,
  postLikeHandler,
  postCommentHandler,
}

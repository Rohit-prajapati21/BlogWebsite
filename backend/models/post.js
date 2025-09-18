const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    tags: [String],
    image: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: {
      count: {
        type: Number,
        default: 0,
      },
      likeByUser: [mongoose.Schema.Types.ObjectId],
    },
    comments: [
      {
        commentBy: {
          type: String,
        },
        comment: {
          type: String,
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)

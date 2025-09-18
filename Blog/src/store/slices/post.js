import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const getAllPosts = createAsyncThunk(
  'post/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://blogwebsite-5l2a.onrender.com/api/post',
        {
          withCredentials: true,
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch posts'
      )
    }
  }
)

export const createPost = createAsyncThunk(
  'post/create',
  async (createPostData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://blogwebsite-5l2a.onrender.com/api/post/create',
        createPostData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create post'
      )
    }
  }
)

export const likeOnPost = createAsyncThunk(
  'post/like',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://blogwebsite-5l2a.onrender.com/api/post/like/${postId}`,
        {},
        {
          withCredentials: true,
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to like on post'
      )
    }
  }
)

export const commentOnPost = createAsyncThunk(
  'post/comment',
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://blogwebsite-5l2a.onrender.com/api/post/comment',
        commentData,
        {
          withCredentials: true,
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create post'
      )
    }
  }
)

export const userPost = createAsyncThunk(
  'post/userpost',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://blogwebsite-5l2a.onrender.com/api/post/user-post`,

        {
          withCredentials: true,
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get user posts'
      )
    }
  }
)

export const updatePost = createAsyncThunk(
  'post/update',
  async (DataForUpdatePost, { rejectWithValue }) => {
    try {
      const { postId, ...postData } = DataForUpdatePost
      const response = await axios.put(
        `https://blogwebsite-5l2a.onrender.com/api/post/update/${postId}`,
        postData,
        {
          withCredentials: true,
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update post'
      )
    }
  }
)

export const deletePost = createAsyncThunk(
  'post/delete',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://blogwebsite-5l2a.onrender.com/api/post/delete/${postId}`,
        {
          withCredentials: true,
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete post'
      )
    }
  }
)

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    userPosts: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      // get all post
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.posts = action.payload
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // create post
      .addCase(createPost.pending, (state) => {
        state.loading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.posts.unshift(action.payload.post)
        console.log('createpost', action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // like post
      .addCase(likeOnPost.pending, (state) => {
        state.loading = true
      })
      .addCase(likeOnPost.fulfilled, (state, action) => {
        state.loading = false
        state.error = null

        const updatedPost = action.payload.postLiked
        const indexForPosts = state.posts.findIndex(
          (post) => post.postData._id === updatedPost._id
        )
        const indexForUserPosts = state.userPosts.findIndex(
          (post) => post._id === updatedPost._id
        )
        if (indexForPosts !== -1) {
          state.posts[indexForPosts].postData = updatedPost
        }
        if (indexForUserPosts !== -1) {
          state.userPosts[indexForUserPosts] = updatedPost
        }
      })

      .addCase(likeOnPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // comments
      .addCase(commentOnPost.pending, (state) => {
        state.loading = true
      })
      .addCase(commentOnPost.fulfilled, (state, action) => {
        state.loading = false
        state.error = null

        const updatedPost = action.payload.postCommented

        const indexInPosts = state.posts.findIndex(
          (post) => post.postData._id === updatedPost._id
        )
        const indexInUserPosts = state.userPosts.findIndex(
          (post) => post._id === updatedPost._id
        )

        if (indexInPosts !== -1) {
          state.posts[indexInPosts].postData = updatedPost
        }
        if (indexInUserPosts !== -1) {
          state.userPosts[indexInUserPosts] = updatedPost
        }
      })

      .addCase(commentOnPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // user post
      .addCase(userPost.pending, (state) => {
        state.loading = true
      })
      .addCase(userPost.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.userPosts = action.payload
      })
      .addCase(userPost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        const index = state.userPosts.findIndex(
          (post) => post._id === action.payload.post._id
        )

        if (index !== -1) {
          state.userPosts[index] = action.payload.post
        }
        // console.log(action.payload) pending not working
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        const updateUserPosts = state.userPosts.filter(
          (post) => post._id !== action.payload.post._id
        )
        state.userPosts = updateUserPosts
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default postSlice.reducer

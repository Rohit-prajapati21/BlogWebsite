import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const signUp = createAsyncThunk(
  'user/signUp',
  async (userSignUpData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/sign-up',
        userSignUpData,
        { withCredentials: true }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

export const login = createAsyncThunk(
  'user/login',
  async (userLoginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/login',
        userLoginData,
        { withCredentials: true }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/update',
  async (DataForUserUpdate, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        'http://localhost:8080/api/user/update',
        DataForUserUpdate,
        { withCredentials: true }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/logout',
        {},
        { withCredentials: true }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      fullName: '',
      gender: '',
      email: '',
      userId: '',
    },
    isLoggedIn: false,
    isSignUp: false,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // sign up
      .addCase(signUp.pending, (state) => {
        state.loading = true
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false
        state.error = null
        state.isSignUp = true
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.isLoggedIn = true
        state.userData.fullName = action.payload.userData.fullName
        state.userData.email = action.payload.userData.email
        state.userData.gender = action.payload.userData.gender
        state.userData.userId = action.payload.userData.id
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.isLoggedIn = true
        state.userData.fullName = action.payload.fullName
        state.userData.email = action.payload.email
        state.userData.gender = action.payload.gender
        state.userData.userId = action.payload.id
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // logout
      .addCase(logout.pending, (state) => {
        state.loading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false
        state.error = null
        state.isLoggedIn = false
        state.isSignUp = false
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default userSlice.reducer

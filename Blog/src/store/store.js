// import { configureStore, combineReducers } from '@reduxjs/toolkit'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import { persistReducer, persistStore } from 'redux-persist'
// import postReducer from './slices/post'
// import userReducer from './slices/user'

// const rootReducer = combineReducers({
//   post: postReducer,
//   user: userReducer,
// })

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['user', 'post'],
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// // Create store
// export const store = configureStore({
//   reducer: persistedReducer,
// })

// // Persistor
// export const persistor = persistStore(store)
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import postReducer from './slices/post'
import userReducer from './slices/user'

const appReducer = combineReducers({
  post: postReducer,
  user: userReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined // resets entire redux state to initial values
  }
  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'post'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

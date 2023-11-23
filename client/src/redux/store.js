import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import {  persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/lib/persistStore'

// combine reducer function
const rootReducer=combineReducers({user:userReducer})


//  store settlement

const PersistConfig={
    key:'root',
    storage,
    varsion:1
}

const persistedReducer= persistReducer(PersistConfig,rootReducer);

export const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  })
})

export const persistor = persistStore(store)
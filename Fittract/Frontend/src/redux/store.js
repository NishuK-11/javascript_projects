import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducer/userSlice';

// ✅ COMBINE REDUCERS PROPERLY
const rootReducer = combineReducers({
  user: userReducer,
});

// ✅ APPLY persistReducer TO THE COMBINED REDUCER
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ CONFIGURE STORE CORRECTLY
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


// | Action  | Where It Happens                            | What Happens                              |
// | ------- | ------------------------------------------- | ----------------------------------------- |
// | Sign In | `UserSignIn` API + `dispatch(loginSuccess)` | Stores user/token in Redux & localStorage |
// | Sign Up | `UserSignUp` API                            | Sends data to backend                     |
// | Navbar  | `useSelector(user)`                         | Shows Avatar & Logout                     |
// | Logout  | `dispatch(logout())`                        | Clears user info from everywhere          |
// | Persist | redux-persist                               | Keeps user logged in after refresh        |

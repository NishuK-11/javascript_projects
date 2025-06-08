import { createSlice } from '@reduxjs/toolkit';
// 🔁 Redux Toolkit — to store user data globally

// 💾 Redux Persist — to remember the user even after refresh

// 🌐 Axios — to talk to the backend API
const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      localStorage.setItem("fittrack-app-token", action.payload.token);
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("fittrack-app-token");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;

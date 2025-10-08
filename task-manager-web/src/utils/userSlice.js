import { createSlice } from '@reduxjs/toolkit';

// Load user from localStorage if exists
const savedUser = localStorage.getItem('user');
const initialState = savedUser ? JSON.parse(savedUser) : null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload)); // save in localStorage
      return action.payload;
    },
    removeUser: () => {
      localStorage.removeItem('user'); // remove from localStorage
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

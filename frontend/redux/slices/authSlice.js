import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Retireve user info and token from local storage
const userFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

//Check for an existing guest ID in local storage or generate a new one
const initialGuestId = localStorage.getItem('guestId') || `guest_${new Date().getTime()}`;
localStorage.setItem('guestId', initialGuestId);

//Create a slice for authentication initial state
const initialState = {
    user: userFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
};
//Async thunk for User login
export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData,config);
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        localStorage.setItem('userToken', response.data.token);
        return response.data.user; //Return the user object from the response
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

//Async thunk for User registration
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData, config);
      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      localStorage.setItem('userToken', response.data.token);
      return response.data.user; // Return the user object from the response
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "An error occurred during registration.");
    }
  });

//Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userToken');
            localStorage.setItem('guestId', state.guestId); //Set new guest ID in local storage

        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`;
            localStorage.setItem('guestId', state.guestId); //Set new guest ID in local storage
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(loginUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        })
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(registerUser.rejected, (state,action) => {
            state.loading = false;
            state.error = action.payload.message;
        });
    },
})

export const {logoutUser, generateNewGuestId} = authSlice.actions;
export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk('admin/fetchAllUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
});

// Add a new user
export const addUser = createAsyncThunk('admin/addUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, userData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add user");
    }
});

// Update user info
export const updateUser = createAsyncThunk('admin/updateUser', async ({ id, name, email, role }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, { name, email, role }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update user");
    }
});

// Delete user
export const deleteUser = createAsyncThunk('admin/deleteUser', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
            }
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete user");
    }
});

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add User
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })

            // Update User
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const userIndex = state.users.findIndex((user) => user.id === updatedUser.id);
                if (userIndex !== -1) {
                    state.users[userIndex] = updatedUser;
                }
            })

            // Delete User
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            })

            // Handle Errors
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;;
                state.users.push(action.payload.user);//add a new user to the state
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            });
    }
});

export default adminSlice.reducer;

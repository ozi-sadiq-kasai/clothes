import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Async thunk to fetch orders for a user
export const fetchUserOrders = createAsyncThunk('orders/fetchUserOrders', async (_,{rejectWithValue}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

//Async thunk to fetch orders details by ID
export const fetchOrderDetails = createAsyncThunk(
    'orders/fetchOrderDetails',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            rejectWithValue(error.response.data || 'Something went wrong');
        }
    }
);

const orderSlice = createSlice({
    name:"orders",
    initialState:{
        orders:[],
        orderDetails:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //Fetch User orders
        .addCase(fetchUserOrders.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUserOrders.fulfilled,(state,action)=>{
            state.loading = false;
            state.orders = action.payload;
        })
        .addCase(fetchUserOrders.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
        //Fetch Order details
        .addCase(fetchOrderDetails.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchOrderDetails.fulfilled,(state,action)=>{
            state.loading = false;
            state.orderDetails = action.payload;
        })
        .addCase(fetchOrderDetails.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload.message;
        })
    }
})
export default orderSlice.reducer;
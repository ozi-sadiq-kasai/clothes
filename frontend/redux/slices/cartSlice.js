import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Helper function to load cart from localStorage
const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    return storedCart;
}

//Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//Fetch cart for a user or guest
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${userId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

//Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            productId,
            quantity,
            size,
            color,
            guestId,
            userId
        });
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

//Update the quantity of an item in the cart for a user or guest
export const updateCartItem = createAsyncThunk('cart/updateCartItemQuantity', async ({ productId, quantity, userId, size, guestId, color }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            productId,
            quantity,
            userId,
            size,
            guestId,
            color
        });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
}
)


//Remove an item from the cart for a user or guest  
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ productId, userId, size, guestId, color }, { rejectWithValue }) => {
try {
    const response = await axios({
        method: 'DELETE',
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        data: {
            productId,
            userId,
            size,
            guestId,
            color
        }
    })
    return response.data;
} catch (error) {
    return rejectWithValue(error.response.data);
}
})

//Merge guest cart into user cart
export const mergeCart = createAsyncThunk('cart/mergeCart', async ({ guestId, userId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, {
            guestId,
            userId
        });
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null
    },
    reducers: {
        clearCart: (state) => {
            state.cart = {products:[]};
            localStorage.removeItem('cart');
        }
    },
extraReducers: (builder)=>{
    builder
    .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
    })
    .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
    })
    .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
    })
    .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add to cart";
    })
    .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
    })
    .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to updated item quantity";
    })
    .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
    })
    .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to remove item";
    })
    .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
    })
    .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to merge cart";
    })
},
})

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;


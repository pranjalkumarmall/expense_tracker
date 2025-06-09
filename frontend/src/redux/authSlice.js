import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAuthUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const {
    setLoading,
    setAuthUser
} = authSlice.actions;

export default authSlice.reducer;

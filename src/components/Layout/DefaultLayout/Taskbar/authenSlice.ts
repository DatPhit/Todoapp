import { createSlice } from '@reduxjs/toolkit';

export const authenSlice = createSlice({
    name: 'authentication',
    initialState: {
        status: true,
    },
    reducers: {
        login: (state) => {
            state.status = true;
        },
        logout: (state) => {
            state.status = false;
        },
    },
});

export const { login, logout } = authenSlice.actions;

export default authenSlice.reducer;

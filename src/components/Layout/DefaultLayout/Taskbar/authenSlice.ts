import { createSlice } from '@reduxjs/toolkit';

export const authenSlice = createSlice({
    name: 'authentication',
    initialState: true,
    reducers: {
        login: (state) => {
            state = true;
        },
        logout: (state) => {
            state = false;
        },
    },
});

export const { login, logout } = authenSlice.actions;

export default authenSlice.reducer;

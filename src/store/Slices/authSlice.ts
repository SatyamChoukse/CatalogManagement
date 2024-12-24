import conf from '@/conf/conf';
import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem(conf.token) != null? localStorage.getItem(conf.token): null;

const initialState = {
    status: false,
    token: token,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.token = action.payload.token;
            state.userData = action.payload.userData;
            localStorage.setItem(conf.token, action.payload.token);
        },
        logout: (state) => {
            state.status = false;
            state.token = null;
            state.userData = null;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
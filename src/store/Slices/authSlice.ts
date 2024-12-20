import conf from '@/conf/conf';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false,
    token: null,
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
import { createSlice } from "@reduxjs/toolkit"
import { forgotPassword, logoutUser, resetPassword, signInUser, signUpUser, verifyEmail } from "./authApi";


const initialState = {
    currentUser: null,
    loading: false,
    error: null,
    success: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthState: (state) => {
            state.error = null;
            state.success = null
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(signUpUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(signUpUser.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.currentUser = action.payload.user
            state.success = action.payload.message

        })
        .addCase(signUpUser.rejected, (state, action) => {
            state.loading = false
            state.success = null
            state.error = action.payload

        })


        .addCase(signInUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(signInUser.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.currentUser = action.payload.user
            state.success = action.payload.message

        })
        .addCase(signInUser.rejected, (state, action) => {
            state.loading = false
            state.success = null
            state.error = action.payload

        })


        .addCase(logoutUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.currentUser = null
            state.success = action.payload.message

        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false
            state.success = null
            state.error = action.payload

        })


        .addCase(verifyEmail.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(verifyEmail.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.currentUser = action.payload.user
            state.success = action.payload.message

        })
        .addCase(verifyEmail.rejected, (state, action) => {
            state.loading = false
            state.success = null
            state.error = action.payload

        })



        .addCase(forgotPassword.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success = action.payload.message

        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false
            state.success = null
            state.error = action.payload

        })


        .addCase(resetPassword.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false
            state.error = null
            state.success = action.payload.message

        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.loading = false
            state.success = null
            state.error = action.payload

        })


    }
})

export const {resetAuthState} = authSlice.actions
export default authSlice.reducer
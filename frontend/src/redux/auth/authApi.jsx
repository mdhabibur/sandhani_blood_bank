import { createAsyncThunk } from "@reduxjs/toolkit";



export const signUpUser = createAsyncThunk(
	"auth/signUpUser",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(credentials.url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials.formData),
				credentials: "include",
			});

			const data = await response.json();

			console.log("data: ", data);

			if (data.success === false) {
				return rejectWithValue(data?.message || "Sign up failed");
			}

			return data;
		} catch (error) {
			console.log("error: ", error);
			return rejectWithValue("an error occurred during sign-up in FE");
		}
	}
);


export const signInUser = createAsyncThunk(
	"auth/signInUser",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(credentials.url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials.formData),
				credentials: "include",
			});

			const data = await response.json();
			console.log("data: ", data);

			if (data.success === false) {
				return rejectWithValue(data?.message || "Sign in failed");
			}

			return data;
		} catch (error) {
			console.log("error: ", error);
			return rejectWithValue("an error occurred during sign-up in FE");
		}
	}
);

export const logoutUser = createAsyncThunk(
	"auth/logoutUser",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(credentials.url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});

			const data = await response.json();
			console.log("data: ", data);

			if (data.success === false) {
				return rejectWithValue(data?.message || "Sign in failed");
			}

			return data;
		} catch (error) {
			console.log("error: ", error);
			return rejectWithValue("an error occurred during sign-up in FE");
		}
	}
);

export const verifyEmail = createAsyncThunk(
	"auth/verifyEmail",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(credentials.url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials.formData),
				credentials: "include",
			});

			const data = await response.json();

			console.log("data: ", data);

			if (data.success === false) {
				return rejectWithValue(data?.message || "email verification in failed");
			}


			return data;
		} catch (error) {
			console.log("error: ", error);
			return rejectWithValue("an error occurred during sign-up in FE");
		}
	}
);

export const forgotPassword = createAsyncThunk(
	"auth/forgotPassword",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(credentials.url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials.formData),
				credentials: "include",
			});

			const data = await response.json();

			console.log("data: ", data);

			if (data.success === false) {
				return rejectWithValue(data?.message || "reset password failed");
			}


			return data;
		} catch (error) {
			console.log("error: ", error);
			return rejectWithValue("an error occurred during sign-up in FE");
		}
	}
);


export const resetPassword = createAsyncThunk(
	"auth/resetPassword",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await fetch(credentials.url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(credentials.formData),
				credentials: "include",
			});

			const data = await response.json();

			console.log("data: ", data);

			if (data.success === false) {
				return rejectWithValue(data?.message || "reset password failed");
			}


			return data;
		} catch (error) {
			console.log("error: ", error);
			return rejectWithValue("an error occurred during sign-up in FE");
		}
	}
);
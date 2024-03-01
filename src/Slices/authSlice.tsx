import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../Services/authService";
import { encrypt } from '../Utils/Crypto';
import {addTokens, removeTokens} from "../Hooks/useAuth";

//!declarando interface do state
export interface IAuthSate {
	error: []
	success: boolean,
	loading: boolean	
};

//! inicializando state inicial
const initialState: IAuthSate = {
	error: [],
	success: false,
	loading: false
}

export const login = createAsyncThunk(
  "auth/login",
  async ({email, password}: {email: string, password: string}, thunkAPI) => {
    const encryptedData = encrypt({email, password});
		const data = await authService.login(encryptedData);

		if (typeof data === 'object' && "errorMessage" in data) {
			return thunkAPI.rejectWithValue(data.errorMessage);
		}
		addTokens('accessToken', data.accessToken);
		addTokens('refreshToken', data.refreshToken);
    return data;
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_:undefined, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken") || '';
		const data = await authService.logout(accessToken);

		if (typeof data === 'object' && "errorMessage" in data) {
			return thunkAPI.rejectWithValue(data.errorMessage);
		}

		removeTokens('accessToken');
		removeTokens('refreshToken');
    return data;
  }
);

export const activate = createAsyncThunk(
  "auth/activate",
  async (activationToken: string, thunkAPI) => {
    const data = await authService.activate(activationToken);
		
		if (typeof data === 'object' && "errorMessage" in data) {
			return thunkAPI.rejectWithValue(data.errorMessage);
		}
    return data;
  }
);

export const resendActivation = createAsyncThunk(
  "auth/resendActivation",
  async ({email, origin}: {email: string, origin: string}, thunkAPI) => {
    const data = await authService.resendActivation(email, origin);
		
		if (typeof data === 'object' && "errorMessage" in data) {
			return thunkAPI.rejectWithValue(data.errorMessage);
		}
    return data;
  }
);

export const sendPasswordRecover = createAsyncThunk(
  "auth/sendPasswordRecover",
  async ({email, origin}: {email: string, origin: string}, thunkAPI) => {
    const data = await authService.sendPasswordRecover(email, origin);
		
		if (typeof data === 'object' && "errorMessage" in data) {
			return thunkAPI.rejectWithValue(data.errorMessage);
		}
    return data;
  }
);

export const passwordRecover = createAsyncThunk(
  "auth/passwordRecover",
  async ({password, confirmPassword, token}:{password: string, confirmPassword: string, token: string}, thunkAPI) => {
    const encryptedData = encrypt({password, confirmPassword});
		const data = await authService.passwordRecover(encryptedData, token);

		if (typeof data === 'object' && "errorMessage" in data) {
			return thunkAPI.rejectWithValue(data.errorMessage);
		}

    return data;
  }
);


//!slicer
export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.error = [];
			state.success = false;
			state.loading = false;			
		}
	},
	extraReducers: (builder) => {
		builder
		.addCase(login.pending, (state) => {
			state.loading = true;
			state.error = [];
			state.success = false;
		})
		.addCase(login.fulfilled, (state) => {
			state.loading = false;
			state.error = [];
			state.success = true;
		})
		.addCase(login.rejected, (state, action) => {
			state.loading = false;
			console.log(action.payload);
			state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
			state.success = false;
		})	
		.addCase(logout.pending, (state) => {
			state.loading = true;
			state.error = [];
			state.success = false;
		})
		.addCase(logout.fulfilled, (state) => {
			state.loading = false;
			state.error = [];
			state.success = true;
		})
		.addCase(logout.rejected, (state, action) => {
			state.loading = false;
			console.log(action.payload);
			state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
			state.success = false;
		})			
		.addCase(activate.pending, (state) => {
			state.loading = true;
			state.error = [];
			state.success = false;
		})
		.addCase(activate.fulfilled, (state) => {
			state.loading = false;
			state.error = [];
			state.success = true;
		})
		.addCase(activate.rejected, (state, action) => {
			state.loading = false;
			state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
			state.success = false;
		})
		.addCase(resendActivation.pending, (state) => {
			state.loading = true;
			state.error = [];
			state.success = false;
		})
		.addCase(resendActivation.fulfilled, (state) => {
			state.loading = false;
			state.error = [];
			state.success = true;
		})
		.addCase(resendActivation.rejected, (state, action) => {
			state.loading = false;
			state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
			state.success = false;
		})
		.addCase(sendPasswordRecover.pending, (state) => {
			state.loading = true;
			state.error = [];
			state.success = false;
		})
		.addCase(sendPasswordRecover.fulfilled, (state) => {
			state.loading = false;
			state.error = [];
			state.success = true;
		})
		.addCase(sendPasswordRecover.rejected, (state, action) => {
			state.loading = false;
			state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
			state.success = false;
		})
		.addCase(passwordRecover.pending, (state) => {
			state.loading = true;
			state.error = [];
			state.success = false;
		})
		.addCase(passwordRecover.fulfilled, (state) => {
			state.loading = false;
			state.error = [];
			state.success = true;
		})
		.addCase(passwordRecover.rejected, (state, action) => {
			state.loading = false;
			state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
			state.success = false;
		})
	}
});

export const { reset } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;

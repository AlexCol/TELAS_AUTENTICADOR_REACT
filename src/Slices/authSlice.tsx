import Cookies from 'js-cookie';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthData } from "../Interfaces/IAuthData";
import { authService } from "../Services/authService";
import { encrypt } from '../Utils/Crypto';


//!declarando interface do state
export interface IAuthSate {
	authTokens: IAuthData|null,
	error: []
	success: boolean,
	loading: boolean	
};

//! buscando dados dos cookies, pra ver se já não tem cadastro
function getLoggedInfo(): IAuthData|null {
	const access = Cookies.get("accessToken");
	const refresh = Cookies.get("refreshToken");
	if (access && refresh) {
		const data: IAuthData = {accessToken: access, refreshToken: refresh};
		return data;
	}
	return null;
}


//! inicializando state inicial
const initialState: IAuthSate = {
	authTokens: getLoggedInfo(),
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
		Cookies.set('accessToken', data.accessToken, {sameSite: 'Strict', secure: true});
		Cookies.set('refreshToken', data.refreshToken, {sameSite: 'Strict', secure: true});

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
			state.authTokens = getLoggedInfo();
		})
		.addCase(login.rejected, (state, action) => {
			state.loading = false;
			state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
			state.success = false;
			state.authTokens = null;
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
				state.authTokens = null;
			})
			.addCase(activate.rejected, (state, action) => {
				state.loading = false;
				state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
				state.success = false;
				state.authTokens = null;
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
				state.authTokens = null;
			})
			.addCase(resendActivation.rejected, (state, action) => {
				state.loading = false;
				state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
				state.success = false;
				state.authTokens = null;
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
				state.authTokens = null;
			})
			.addCase(sendPasswordRecover.rejected, (state, action) => {
				state.loading = false;
				state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
				state.success = false;
				state.authTokens = null;
			})	
	}
});

export const { reset } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;

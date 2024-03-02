import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserData } from "../Interfaces/IUserData";
import { userService } from "../Services/userService";
import { IRegisterData } from "../Interfaces/IRegisterData";
import { decrypt, encrypt } from "../Utils/Crypto";
import { IUpdateData } from "../Interfaces/IUpdateData";
import { removeTokens } from "../Hooks/useAuth";


//!declarando interface do state
export interface IUserSate {
	user: IUserData|null,
	error: []
	success: string,
	loading: boolean	
};

//! inicializando state inicial
const initialState: IUserSate = {
	user: null,
	error: [],
	success: '',
	loading: false	
}

export const register = createAsyncThunk(
  "user/register",
  async ({registerData, origin} : {registerData: IRegisterData, origin: string}, thunkAPI) => {
    const encryptedData = {data: encrypt(registerData)};
		const data = await userService.register(encryptedData, origin);
		
		if (typeof data === 'object' && "errorMessage" in data) {
			return thunkAPI.rejectWithValue(data.errorMessage);
		}
    return data;
  }
);

export const getProfile = createAsyncThunk(
  "user/getprofile",
  async (_:undefined, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken") || '';
		const data = await userService.getProfile(accessToken);

		if (typeof data === 'object' && "errorMessage" in data) {
			return thunkAPI.rejectWithValue(data.errorMessage);
		}
    return data;
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateprofile",
  async (updateData:IUpdateData, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken") || '';
		const cryptedData = {data: encrypt(updateData)};
		const data = await userService.updateProfile(accessToken, cryptedData);
		
		if (typeof data === 'object' && "errorMessage" in data) {
			return thunkAPI.rejectWithValue(data.errorMessage);
		}
    return data;
  }
);

export const deleteProfile = createAsyncThunk(
  "user/updateprofile",
  async (_:undefined, thunkAPI) => {
    const accessToken = localStorage.getItem("accessToken") || '';
		const data = await userService.deleteProfile(accessToken);
		
		if (typeof data === 'object' && "errorMessage" in data) {
			return thunkAPI.rejectWithValue(data.errorMessage);
		}
		removeTokens('accessToken');
    return data;
  }
);

//!slicer
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		reset: (state) => {
			state.error = [];
			state.success = '';
			state.loading = false;			
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loading = true;
				state.error = [];
				state.success = '';
			})
			.addCase(register.fulfilled, (state, action) => {
				state.loading = false;
				state.error = [];
				state.success = JSON.parse(JSON.stringify(action.payload)).success;
				state.user = null;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
				state.success = '';
				state.user = null;
			})
			.addCase(getProfile.pending, (state) => {
				state.loading = true;
				state.error = [];
				state.success = '';
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.error = [];
				state.success = '';
				state.user = JSON.parse(JSON.stringify(decrypt(action.payload)));
			})
			.addCase(getProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
				state.success = '';
				state.user = null;
			})
			.addCase(updateProfile.pending, (state) => {
				state.loading = true;
				state.error = [];
				state.success = '';
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.error = [];
				state.success = 'Dados atualizados com sucesso!';
				state.user = JSON.parse(JSON.stringify(decrypt(action.payload)));
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
				state.success = '';
			})
	}
});

export const { reset } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;

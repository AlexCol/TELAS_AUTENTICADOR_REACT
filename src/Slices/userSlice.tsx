import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUserData } from "../Interfaces/IUserData";
import { userService } from "../Services/userService";
import { IRegisterData } from "../Interfaces/IRegisterData";


//!declarando interface do state
export interface IAuthSate {
	user: IUserData|null,
	error: []
	success: string,
	loading: boolean	
};

//! inicializando state inicial
const initialState: IAuthSate = {
	user: null,
	error: [],
	success: '',
	loading: false	
}

export const register = createAsyncThunk(
  "user/register",
  async ({registerData, origin} : {registerData: IRegisterData, origin: string}, thunkAPI) => {
    const data = await userService.register(registerData, origin);
		
		if (typeof data === 'object' && "errorMessage" in data) {
			return thunkAPI.rejectWithValue(data.errorMessage);
		}
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
	}
});

export const { reset } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;

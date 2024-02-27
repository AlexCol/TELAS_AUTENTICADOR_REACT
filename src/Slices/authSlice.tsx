import Cookies from 'js-cookie';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authCookieName } from "../API/config";
import { IAuthData } from "../Interfaces/IAuthData";
import { authService } from "../Services/authService";


//!declarando interface do state
export interface IAuthSate {
	authUser: IAuthData|null,
	error: []
	success: boolean,
	loading: boolean	
};

//! buscando dados dos cookies, pra ver se já não tem cadastro
const cookieValue = Cookies.get(authCookieName);
const loggedData:IAuthData = cookieValue ? JSON.parse(cookieValue) : null;

//! inicializando state inicial
const initialState: IAuthSate = {
	authUser: loggedData,
	error: [],
	success: false,
	loading: false	
}


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
			.addCase(activate.pending, (state) => {
				state.loading = true;
				state.error = [];
				state.success = false;
			})
			.addCase(activate.fulfilled, (state) => {
				state.loading = false;
				state.error = [];
				state.success = true;
				state.authUser = null;
			})
			.addCase(activate.rejected, (state, action) => {
				state.loading = false;
				state.error = JSON.parse(JSON.stringify(action.payload)).errorMessage;
				state.success = false;
				state.authUser = null;
			})
	}
});

export const { reset } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;

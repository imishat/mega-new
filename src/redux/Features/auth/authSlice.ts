import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isLoading: boolean;
  error: string | null;
  token: string;
  data: object;
};

const initialState: AuthState = {
  isLoading: true,
  error: null,
  token: '',
  data: {}
}

export const {
  actions: {
    setAuthData,
    setLoading
  },
  reducer: authReducer,
} = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.data = action.payload;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    setLoading: (state, {payload}) => {
      state.isLoading = payload;
     
    }
  },
  extraReducers:(()=>{})
});
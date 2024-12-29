import { StorageKeysEnum, UserAuthInfoInt } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginRequest, registerRequest, verifyOtpRequest } from "./authasync";
import { Storages } from "@/lib/helpers";

interface AuthStates {
  user : UserAuthInfoInt | undefined,
  register : {
    loading : boolean,
    error : boolean
  },
  verifyOtp : {
    loading : boolean,
    error : boolean
  },
  login : {
    loading: boolean,
    error : boolean
  }
}

export const initialState: AuthStates   = {
  user : {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    created_at: '',
    avi: '',
    isVerified : undefined,
    notificationPreferences : {
        email: true,
        push: true,
        sms : false
    },
    wallet: {
        balance: 0,
        tokens: [],
        transactions: [],
        address : ''
    },
},
register : {
    loading : false,
    error : false
},
verifyOtp : {
  loading : false,
  error : false
},
login : {
  loading : false,
  error : false
}
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser : (state, action : PayloadAction<UserAuthInfoInt>) =>{
        state.user =  action.payload
    }
  },
  extraReducers : (builder) => {
    builder
    .addCase(registerRequest.pending, (state) => {
        state.register.loading = true
    })
    .addCase(registerRequest.fulfilled, (state) => {  
        state.register.loading = false
    })
    .addCase(registerRequest.rejected , (state) =>{
        state.register.loading = false;
        state.register.error = true;
    })
    .addCase(verifyOtpRequest.pending, (state) => {
        state.verifyOtp.loading = true
    })
    .addCase(verifyOtpRequest.fulfilled, (state) => {  
        state.verifyOtp.loading = false
    })
    .addCase(verifyOtpRequest.rejected , (state) =>{
        state.verifyOtp.loading = false;
        state.verifyOtp.error = true;
    })
    .addCase(loginRequest.pending, (state) => {
        state.login.loading = true
    })
    .addCase(loginRequest.fulfilled, (state,action) => {  
        state.login.loading = false;
        setUser(action.payload.data);
        Storages.setStorage('local', StorageKeysEnum.user,action.payload.data)
    })
    .addCase(loginRequest.rejected , (state) =>{
        state.login.loading = false;
        state.login.error = true;
    })
  }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

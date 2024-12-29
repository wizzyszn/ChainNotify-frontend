import { loginReq, registerReq, requestOtp, verifyOtpReq } from "@/services/chainnotify.services";
import { GeneralReturnInt, RejectedPayload, UserAuthInfoInt } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

//?* Register User
const registerRequest = createAsyncThunk<GeneralReturnInt<UserAuthInfoInt>,  {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
},  {
    rejectValue: RejectedPayload;
}>('user/register',async ({
    firstName,
    lastName,
    email,
    password

}, {rejectWithValue}) =>{
    try{
        const response = await registerReq({
            firstName,
            lastName,
            email,
            password  
        });
        return response;
    }catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Something went during registeration",
        });
    }
})

//?* Request Otp
const OtpRequest = createAsyncThunk<GeneralReturnInt<{
    email : string
}>, {
    email : string
}, {
    rejectValue: RejectedPayload;
}>("user/request-otp", async ({
    email
}, {rejectWithValue}) =>{
    try{
        const response = await requestOtp(email);
        return response
    }catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Something while requesting for OTP",
        });
    }
})
//?* Verify Otp
const verifyOtpRequest = createAsyncThunk<GeneralReturnInt<{
    email : string
}>, {
    email : string,
    otp : string
}, {
    rejectValue: RejectedPayload;
}>("user/verify-otp", async ({
    email,
    otp
}, {rejectWithValue}) =>{
    try{
        const response = await verifyOtpReq(email,otp);
        return response
    }catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Something went wrong while requesting for OTP",
        });
    }
})
//?* Request Otp
const loginRequest = createAsyncThunk<GeneralReturnInt<UserAuthInfoInt>, {
    email : string,
    password : string
}, {
    rejectValue: RejectedPayload;
}>("user/login", async ({
    email,
    password
}, {rejectWithValue}) =>{
    try{
        const response = await loginReq(email,password);
        return response
    }catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Something went wrong while logging in....",
        });
    }
})
export {
    registerRequest,
    OtpRequest,
    verifyOtpRequest,
    loginRequest
}
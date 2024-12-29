import { GeneralReturnInt, Notifications, UserAuthInfoInt } from "@/types";
import { options, requestHandler, urlGenerator } from "./config";
/*import {
    DataInt,
    AuthReturnInt,
    UserInfoInt,
    GeneralPaginatedRespInt,
    GeneralReturnInt,
    MainUserInfoInt,
    CreateProjectDataType,
    Project,
    GeneratedReportInt,
    MulDeleteProject,
    ChartDataInt,
    ExportDataBody,
    Metrics,
} from "@/lib/types";



// *Email Verify
export const verifyEmailReq = (data: { otp: number }) => {
    const url = urlGenerator("auth", "verify-email");
    return requestHandler<void>(url, options("POST", data));
};

// *Request OTP
export const getOtpReq = () => {
    const url = urlGenerator("auth", "request-otp");
    return requestHandler<void>(url, options("POST", {}));
};

// *User Login
export const loginReq = (data: { email: string; password: string }) => {
    const url = urlGenerator("auth", "login", false);
    return requestHandler<GeneralReturnInt<MainUserInfoInt>>(
        url,
        options("POST", data)
    );
};

// *Forgot Password
export const forgotPwordReq = (data: { email: string }) => {
    const url = urlGenerator("auth", "forgot-password", false);
    return requestHandler<{
        status: string;
        message: string;
        status_code: string;
        data: string;
    }>(url, options("POST", data));
};

// *Reset Password
export const resetPwordReq = (data: {
    new_password: string;
    confirm_password: string;
}) => {
    const url = urlGenerator("auth", "reset-password");
    return requestHandler<
        Pick<AuthReturnInt, "message"> & {
            data: Omit<UserInfoInt, "created_at" | "profile_picture">;
        }
    >(url, options("POST", data));
};

// *Get Authenticated User
export const getAuthUserReq = () => {
    const url = urlGenerator("users", "profile/me", false);
    return requestHandler<GeneralReturnInt<MainUserInfoInt>>(
        url,
        options("GET", undefined, true)
    );
}; */

// ? AUTHENTICATION
// *Create new user
export const registerReq = (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}) => {
    const url = urlGenerator("auth", "register");
    return requestHandler<GeneralReturnInt<UserAuthInfoInt>>(url, options("POST", data));
};

//*? Request Otp
export const requestOtp = (
    email : string
) =>{
const url = urlGenerator("auth", "request-otp");
return requestHandler<GeneralReturnInt<{email : string}>>(url,options("POST", {email}));
}

//?* Verify Otp
export const verifyOtpReq = (
    email : string,
    otp : string
) =>{
const url = urlGenerator("auth", "verify-otp");
return requestHandler<GeneralReturnInt<{email : string}>>(url,options("POST", {email, otp}));
}

//?* Login 

export const loginReq = (
    email : string,
    password : string
) =>{
    const url = urlGenerator("auth", "login");
return requestHandler<GeneralReturnInt<UserAuthInfoInt>>(url,options("POST", {email, password}));
}

//?* Connect wallet
export const connectWalletReq = (email : string,
    address : string,
) =>{
const url = urlGenerator("wallet", "connect");
return requestHandler<GeneralReturnInt<UserAuthInfoInt>>(url,options("POST", {address,email}));
}
//?* Get all transactions
export const getAllTransactionsReq = (email : string) =>{    
    const url = urlGenerator("wallet", "transactions");
    return requestHandler<GeneralReturnInt<Notifications[]>>(url,options("POST", {email}));
}

//? Mark transaction as read
export const markAsReadReq = (email : string, notificationId : string) =>{
    const url = urlGenerator("wallet", "mark-as-read");
    return requestHandler<GeneralReturnInt<Notifications>>(url,options("POST", {email, notificationId}));
}

//? Mark all transactions as read
export const markAllAsReadReq = (email : string) =>{
    const url = urlGenerator("wallet", "mark-all-as-read");
    return requestHandler<GeneralReturnInt<Notifications>>(url,options("POST", {email}));
}
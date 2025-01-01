import { getAllTransactionsReq, getNotificationByIdReq, markAllAsReadReq, markAsReadReq } from "@/services/chainnotify.services";

import { GeneralReturnInt, Notifications, RejectedPayload } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

//?: get all notifications
const getNotificationsRequest = createAsyncThunk<GeneralReturnInt<Notifications[]>, {
    email: string
}, {
    rejectValue: RejectedPayload;
}>("notification/get-notifications", async ({ email }, { rejectWithValue }) => {
    try {
        const response = await getAllTransactionsReq(email);
        return response;
    } catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Something went wrong while fetching notifications",
        });
    }
});
//?: mark notification as read
const markAsReadRequest = createAsyncThunk<GeneralReturnInt<Notifications>, {     
    notificationId: string;
    email: string;
}, {
    rejectValue: RejectedPayload;
}>("notification/mark-as-read", async ({ notificationId, email }, { rejectWithValue }) => {
    try {
        const response = await markAsReadReq(email,notificationId);
        return response;
    } catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Something went wrong while marking notification as read",
        });
    }
});
//?: mark all notifications as read
const markAllAsReadRequest = createAsyncThunk<GeneralReturnInt<Notifications>, {    
    email: string;
}, {
    rejectValue: RejectedPayload;
}>("notification/mark-all-as-read", async ({ email }, { rejectWithValue }) => {
    try {
        const response = await markAllAsReadReq(email);
        return response;
    } catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Something went wrong while marking all notifications as read",
        });
    }
});
//?* get a notification by id
const getNotificationByIdRequest = createAsyncThunk<GeneralReturnInt<Notifications>, {
    notificationId: string,
    email : string
}, {
    rejectValue: RejectedPayload;
}>("notification/get-notification-by-id", async ({ notificationId , email}, { rejectWithValue }) => {
    try {
        const response = await getNotificationByIdReq(notificationId, email);
        return response;
    } catch (err) {
        if (err instanceof Error) {
            return rejectWithValue({
                message: err.message,
            });
        }
        return rejectWithValue({
            message: "Something went wrong while fetching notification",
        });
    }
});
export { getNotificationsRequest, markAsReadRequest,markAllAsReadRequest, getNotificationByIdRequest}
import { getAllTransactionsReq, markAllAsReadReq, markAsReadReq } from "@/services/chainnotify.services";

import { GeneralReturnInt, Notifications, RejectedPayload } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
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

const markAsReadRequest = createAsyncThunk<GeneralReturnInt<Notifications>, {     
    notificationId: string;
    email: string;
}, {
    rejectValue: RejectedPayload;
}>("notification/mark-as-read", async ({ notificationId, email }, { rejectWithValue }) => {
    try {
        const response = await markAsReadReq(notificationId, email);
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
})
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
})
export { getNotificationsRequest, markAsReadRequest,markAllAsReadRequest }
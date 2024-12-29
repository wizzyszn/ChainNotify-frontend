/// notification slice
import { createSlice } from '@reduxjs/toolkit';
import { getNotificationsRequest, markAllAsReadRequest, markAsReadRequest } from './notificationasync';
import { Notifications } from '@/types';

export interface NotificationState {
  notifications: Notifications[],
  loading : boolean
}

const initialState: NotificationState = {
  notifications: [],
  loading : false
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotificationsRequest.pending, (state) => {
      state.loading = true;
    }).addCase(getNotificationsRequest.fulfilled, (state, action) => {
      state.loading = false;

      state.notifications = action.payload.data;
    }).addCase(getNotificationsRequest.rejected, (state) => {
      state.loading = false;
    })
     // New handlers for markAsReadRequest
     .addCase(markAsReadRequest.fulfilled, (state, action) => {
       const updatedNotification = action.payload;
       const index = state.notifications.findIndex(n => n._id === updatedNotification.data._id);
       if (index !== -1) {
         state.notifications[index].read = true;
       }
     })

   // New handlers for markAllAsReadRequest
   builder
     .addCase(markAllAsReadRequest.fulfilled, (state) => {
       state.notifications = state.notifications.map(notification => ({
         ...notification,
         read: true
       }));
     });
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
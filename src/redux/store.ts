import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/Auth/authslice"
import notificationReducer from "@/redux/notification/notificationslice"
const store = configureStore({
  reducer: {
    // Add reducers here
    auth : authReducer,
    notification : notificationReducer 
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

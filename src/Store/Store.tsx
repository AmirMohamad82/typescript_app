import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Features/FeatureLogin/LoginSlice";
import taskReducer from "../Features/FeatureTask/TaskSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    task: taskReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

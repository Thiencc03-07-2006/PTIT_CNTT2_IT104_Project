import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import projectReducer from "../features/projectSlice";
import taskReducer from "../features/taskSlice";
const store = configureStore({
  reducer: { user: userReducer, project: projectReducer, task: taskReducer },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

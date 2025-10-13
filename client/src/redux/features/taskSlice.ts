import { createSlice } from "@reduxjs/toolkit";
import type { Task } from "../../utils/type";
import {
  addTask,
  deleteTask,
  fetchTaskDataOfProject,
  fetchTaskDataOfUser,
  updateTask,
} from "../../apis/taskApi";
import { toast } from "react-toastify";
interface Tasks {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  tasks: Task[];
  error: unknown;
}
const initialState: Tasks = {
  status: "idle",
  tasks: [],
  error: null,
};
const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskDataOfProject.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchTaskDataOfProject.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.tasks = action.payload;
      })
      .addCase(fetchTaskDataOfProject.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(fetchTaskDataOfUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchTaskDataOfUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.tasks = action.payload;
      })
      .addCase(fetchTaskDataOfUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(addTask.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        } else {
          toast.warning("Cập nhật thất bại");
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});
export default TaskSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { Project } from "../../utils/type";
import {
  addMember,
  addProject,
  deleteProject,
  fetchProjectData,
  updateProject,
} from "../../apis/projectApi";
import { toast } from "react-toastify";
interface Projects {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  projects: Project[];
  error: unknown;
}
const initialState: Projects = {
  status: "idle",
  projects: [],
  error: null,
};
const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProjectData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.projects = action.payload;
      })
      .addCase(fetchProjectData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(addProject.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.projects.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.projects = state.projects.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const index = state.projects.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        } else {
          toast.warning("Cập nhật thất bại");
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(addMember.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const index = state.projects.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index].members.push(action.payload.member);
        } else {
          toast.warning("Cập nhật thất bại");
        }
      })
      .addCase(addMember.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});
export default ProjectSlice.reducer;

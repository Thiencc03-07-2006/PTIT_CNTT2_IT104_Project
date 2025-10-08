import { createSlice } from "@reduxjs/toolkit";
import type { Project } from "../../utils/type";
import { addProject, fetchProjectData } from "../../apis/projectApi";
interface Projects {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  projects: Project[];
  nowProject: Project | null;
  error: unknown;
}
const initialState: Projects = {
  status: "idle",
  projects: [],
  nowProject: JSON.parse(localStorage.getItem("nowAcc") || "null"),
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
      });
  },
});
export default ProjectSlice.reducer;

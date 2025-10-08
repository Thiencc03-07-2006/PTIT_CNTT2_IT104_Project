import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Project } from "../utils/type";
export const fetchProjectData = createAsyncThunk(
  "projects/fetchProjectData",
  async () => {
    try {
      const res = await axios.get("http://localhost:8080/projects");
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const addProject = createAsyncThunk(
  "projects/addProject",
  async (data: Project) => {
    try {
      const res = await axios.post("http://localhost:8080/projects", data);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

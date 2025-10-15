import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Project } from "../utils/type";
import type { ProjectMember } from "../utils/type";
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
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/projects/${id}`);
      return id;
    } catch (error) {
      return error;
    }
  }
);
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (data: Project) => {
    try {
      await axios.patch(`http://localhost:8080/projects/${data.id}`, data);
      return data;
    } catch (error) {
      return error;
    }
  }
);
export const addMember = createAsyncThunk(
  "projects/addMember",
  async (data: { id: string; member: ProjectMember }) => {
    try {
      const res = await axios.get(`http://localhost:8080/projects/${data.id}`);
      const project = res.data;
      const members = project.members;
      members.push(data.member);
      await axios.patch(`http://localhost:8080/projects/${data.id}`, {
        members,
      });
      return data;
    } catch (error) {
      return error;
    }
  }
);
export const deleteMember = createAsyncThunk(
  "projects/deleteMember",
  async (data: { id: string; memberId: string }) => {
    try {
      const res = await axios.get(`http://localhost:8080/projects/${data.id}`);
      const project = res.data;
      const members = project.members;
      members.filter((t) => t.userId !== data.memberId);
      await axios.patch(`http://localhost:8080/projects/${data.id}`, {
        members,
      });
      return data;
    } catch (error) {
      return error;
    }
  }
);

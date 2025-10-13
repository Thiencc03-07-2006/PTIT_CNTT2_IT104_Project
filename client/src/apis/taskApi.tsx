import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Task } from "../utils/type";
export const fetchTaskDataOfProject = createAsyncThunk(
  "tasks/fetchTaskDataOfProject",
  async (id: string) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/tasks/?projectId=${id}`
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const fetchTaskDataOfUser = createAsyncThunk(
  "tasks/fetchTaskDataOfUser",
  async (id: string) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/tasks/?assigneeId=${id}`
      );
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const addTask = createAsyncThunk("tasks/addTask", async (data: Task) => {
  try {
    const res = await axios.post("http://localhost:8080/tasks", data);
    return res.data;
  } catch (error) {
    return error;
  }
});
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);
      return id;
    } catch (error) {
      return error;
    }
  }
);
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (data: Task) => {
    try {
      await axios.patch(`http://localhost:8080/tasks/${data.id}`, data);
      return data;
    } catch (error) {
      return error;
    }
  }
);

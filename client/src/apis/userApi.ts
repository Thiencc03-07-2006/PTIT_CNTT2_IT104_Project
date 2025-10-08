import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../utils/type";
export const fetchUserData = createAsyncThunk(
  "users/fetchUserData",
  async () => {
    try {
      const res = await axios.get("http://localhost:8080/users");
      return res.data;
    } catch (error) {
      return error;
    }
  }
);
export const addUser = createAsyncThunk("users/addUser", async (data: User) => {
  try {
    const res = await axios.post("http://localhost:8080/users", data);
    return res.data;
  } catch (error) {
    return error;
  }
});

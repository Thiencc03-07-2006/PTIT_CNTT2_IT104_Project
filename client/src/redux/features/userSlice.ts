import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../utils/type";
import { addUser, fetchUserData } from "../../apis/userApi";
interface Users {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  users: User[];
  nowUser: string | null;
  error: unknown;
}
const initialState: Users = {
  status: "idle",
  users: [],
  nowUser: JSON.parse(localStorage.getItem("nowAcc") || "null"),
  error: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.users = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});
export default userSlice.reducer;

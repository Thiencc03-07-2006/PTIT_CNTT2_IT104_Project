import { useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchUserData } from "../apis/userApi";
import Loading from "./Loading";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const nowAcc = JSON.parse(localStorage.getItem("nowAcc") || "null");
  const { users, status } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (status === "idle" || status === "rejected") {
      dispatch(fetchUserData());
    }
  }, [dispatch, status]);
  if (!nowAcc) {
    return <Navigate to="/login" replace />;
  }
  const temp = users.find((t) => t.id === nowAcc);
  if (status === "idle" || status === "pending") {
    return <Loading />;
  }
  if (!temp) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

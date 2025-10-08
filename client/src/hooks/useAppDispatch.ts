import { useDispatch } from "react-redux";
import type { AddDispatch } from "../redux/store/store";
export const useAppDispatch = () => useDispatch<AddDispatch>();

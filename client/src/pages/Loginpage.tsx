import React, { useEffect, useState } from "react";
import "../style/login_register.css";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../utils/type";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchUserData } from "../apis/userApi";
import { toast } from "react-toastify";
export default function Loginpage() {
  const navigate = useNavigate();
  const [validate, setValidate] = useState<string[]>([]);
  const [inputAcc, setInputAcc] = useState<User>({
    id: "",
    fullName: "",
    email: "",
    password: "",
  });
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputAcc({ ...inputAcc, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mess = [];
    if (!inputAcc.email || inputAcc.email.trim().length === 0) {
      mess.push("emptyEmail");
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputAcc.email)) {
        mess.push("incorrectEmail");
      }
    }
    if (!inputAcc.password || inputAcc.password.length === 0) {
      mess.push("emptyPassword");
    }
    if (mess.length === 0) {
      setValidate([]);
      const temp = users.find(
        (t) => t.email === inputAcc.email.trim().toLowerCase()
      );
      if (temp) {
        if (temp.password === inputAcc.password) {
          localStorage.setItem("nowAcc", JSON.stringify(temp.id));
          toast.success("Đăng nhập thành công");
          setInputAcc({
            id: "",
            fullName: "",
            email: "",
            password: "",
          });
          setTimeout(() => navigate("/"), 1000);
        } else {
          toast.error("Mật khẩu sai");
        }
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } else {
      setValidate(mess);
    }
  };
  return (
    <div>
      <div className="center_item h-[100vh] flex flex-col">
        <div className="title_page_login_register_main">Đăng nhập</div>
        <div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="form_login_register flex flex-col gap-[33px]"
          >
            <div className="relative">
              <label htmlFor="email">Email</label>
              <br />
              <input
                onChange={handleChange}
                className={`${
                  validate.includes("emptyEmail") ||
                  validate.includes("incorrectEmail")
                    ? "error"
                    : ""
                }`}
                name="email"
                type="text"
                placeholder="Địa chỉ email"
              />
              {validate.includes("emptyEmail") && (
                <p className="error_text absolute left-0 bottom-[-25px]">
                  Địa chỉ email không được để trống
                </p>
              )}
              {validate.includes("incorrectEmail") && (
                <p className="error_text absolute left-0 bottom-[-25px]">
                  Địa chỉ email không đúng định dạng
                </p>
              )}
            </div>
            <div className="relative">
              <label htmlFor="password">Mật khẩu</label>
              <br />
              <input
                onChange={handleChange}
                className={`${
                  validate.includes("emptyPassword") ? "error" : ""
                }`}
                name="password"
                type="password"
                placeholder="Mật khẩu"
              />
              {validate.includes("emptyPassword") && (
                <p className="error_text absolute left-0 bottom-[-25px]">
                  Mật khẩu không được để trống
                </p>
              )}
            </div>
            <button className="mt-[30px] mb-[-3px]">Đăng nhập</button>
            <div className="text-center">
              <span>Chưa có tài khoản? </span>
              <Link to="/register" className="text-[#0D6EFD]">
                <strong>Đăng ký</strong>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

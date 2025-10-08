import { useEffect, useState } from "react";
import "../style/login_register.css";
import { Link } from "react-router-dom";
import type { User } from "../utils/type";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addUser, fetchUserData } from "../apis/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface RegisterForm extends User {
  confirmPassword: string;
}
export default function Registerpage() {
  const navigate = useNavigate();
  const [validate, setValidate] = useState<string[]>([]);
  const [inputAcc, setInputAcc] = useState<RegisterForm>({
    id: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (!inputAcc.fullName || inputAcc.fullName.trim().length === 0) {
      mess.push("emptyName");
    }
    if (!inputAcc.email || inputAcc.email.trim().length === 0) {
      mess.push("emptyEmail");
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputAcc.email)) {
        mess.push("incorrectEmail");
      } else {
        if (
          users.some((t) => t.email === inputAcc.email?.trim().toLowerCase())
        ) {
          mess.push("existsEmail");
        }
      }
    }
    if (!inputAcc.password || inputAcc.password.length === 0) {
      mess.push("emptyPassword");
    } else {
      if (inputAcc.password.length < 8) {
        mess.push("lessPassword");
      }
    }
    if (!inputAcc.confirmPassword || inputAcc.confirmPassword.length === 0) {
      mess.push("emptyConfirmPassword");
    } else {
      if (inputAcc.confirmPassword !== inputAcc.password) {
        mess.push("correctConfirmPassword");
      }
    }
    if (mess.length === 0) {
      setValidate([]);
      const temp = {
        id: crypto.randomUUID(),
        fullName: inputAcc.fullName.trim(),
        email: inputAcc.email.trim().toLowerCase(),
        password: inputAcc.password,
      };
      dispatch(addUser(temp));
      localStorage.setItem("nowAcc", JSON.stringify(temp.id));
      toast.success("Đăng ký thành công");
      setInputAcc({
        id: "",
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setTimeout(() => navigate("/"), 1000);
    } else {
      setValidate(mess);
    }
  };
  return (
    <div>
      <div className="center_item h-[100vh] flex flex-col">
        <div className="title_page_login_register_main">Đăng ký</div>
        <div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="form_login_register flex flex-col gap-[30px]"
          >
            <div className="relative">
              <input
                onChange={handleChange}
                className={`${validate.includes("emptyName") ? "error" : ""}`}
                name="fullName"
                type="text"
                placeholder="Họ và tên"
              />
              {validate.includes("emptyName") && (
                <p className="error_text absolute left-0 bottom-[-25px]">
                  Họ và tên không được để trống
                </p>
              )}
            </div>
            <div className="relative">
              <input
                onChange={handleChange}
                className={`${
                  validate.includes("emptyEmail") ||
                  validate.includes("incorrectEmail") ||
                  validate.includes("existsEmail")
                    ? "error"
                    : ""
                }`}
                name="email"
                type="text"
                placeholder="Địa chỉ emali"
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
              {validate.includes("existsEmail") && (
                <p className="error_text absolute left-0 bottom-[-25px]">
                  Địa chỉ email đã được đăng ký
                </p>
              )}
            </div>
            <div className="relative">
              <input
                onChange={handleChange}
                className={`${
                  validate.includes("emptyPassword") ||
                  validate.includes("lessPassword")
                    ? "error"
                    : ""
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
              {validate.includes("lessPassword") && (
                <p className="error_text absolute left-0 bottom-[-25px]">
                  Mật khẩu phải có ít nhất 8 ký tự
                </p>
              )}
            </div>
            <div className="relative">
              <input
                onChange={handleChange}
                className={`${
                  validate.includes("emptyConfirmPassword") ||
                  validate.includes("correctConfirmPassword")
                    ? "error"
                    : ""
                }`}
                name="confirmPassword"
                type="password"
                placeholder="Xác nhận mật khẩu"
              />{" "}
              {validate.includes("emptyConfirmPassword") && (
                <p className="error_text absolute left-0 bottom-[-25px]">
                  Xác nhận mật khẩu không được để trống
                </p>
              )}
              {validate.includes("correctConfirmPassword") && (
                <p className="error_text absolute left-0 bottom-[-25px]">
                  Xác nhận mật khẩu không giống mật khâu
                </p>
              )}
            </div>
            <button className="mt-[38px] mb-[5px]">Đăng ký</button>
            <div className="text-center">
              <span>Đã có tài khoản? </span>
              <Link to="/login" className="text-[#0D6EFD]">
                <strong>Đăng nhập</strong>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

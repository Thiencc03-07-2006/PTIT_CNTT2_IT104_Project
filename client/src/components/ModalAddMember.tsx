import type React from "react";
import "../style/ModalAddProject.css";
import { useState } from "react";
import type { Project } from "../utils/type";
import type { User } from "../utils/type";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addMember } from "../apis/projectApi";
import { toast } from "react-toastify";
interface props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  users: User[];
}
export default function ModalAddMember({
  setOpen,
  project,
  setProject,
  users,
}: props) {
  const [inputAcc, setInputAcc] = useState<{ email: string; role: string }>({
    email: "",
    role: "",
  });
  const [validate, setValidate] = useState<string[]>([]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputAcc({ ...inputAcc, [e.target.name]: e.target.value });
  };
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const mess = [];
    const index = users.findIndex((t) => t.email === inputAcc.email);
    if (!inputAcc.email || inputAcc.email.trim().length === 0) {
      mess.push("emptyEmail");
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputAcc.email)) {
        mess.push("incorrectEmail");
      } else {
        if (index === -1) {
          mess.push("missEmail");
        } else {
          if (project.members.some((t) => t.userId === users[index].id)) {
            mess.push("existsEmail");
          }
        }
      }
    }
    if (!inputAcc.role || inputAcc.role.trim().length === 0) {
      mess.push("emptyRole");
    } else {
      if (inputAcc.role.length > 30) {
        mess.push("longRole");
      }
    }
    if (mess.length === 0) {
      dispatch(
        addMember({
          id: project.id,
          member: { userId: users[index].id, role: inputAcc.role },
        })
      );
      toast.success(`Thêm thành công`);
      setOpen(false);
      setProject((prev) =>
        prev
          ? {
              ...prev,
              members: [
                ...prev.members,
                { userId: users[index].id, role: inputAcc.role },
              ],
            }
          : prev
      );
    } else {
      setValidate(mess);
    }
  };
  return (
    <div className="modal_add">
      <form
        onSubmit={handleSubmit}
        className="box_input w-[480px] bg-white max-h-max rounded-[7px]"
      >
        <div className="p-[16px] pr-[24px] flex justify-between">
          <h1 className="modal_add_title">Thêm thành viên</h1>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="modal_add_close text-[18px] font-[900] text-[#818181]"
          >
            &#10005;
          </button>
        </div>
        <div className="form_input flex gap-[21px] flex-col">
          <div className="relative">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="text"
              name="email"
              value={inputAcc.email}
              style={{
                borderColor:
                  validate.includes("emptyEmail") ||
                  validate.includes("existsEmail") ||
                  validate.includes("missEmail") ||
                  validate.includes("incorrectEmail")
                    ? "#DC3545"
                    : "#bdbdbd",
              }}
            />
            {validate.includes("emptyEmail") && (
              <p className="error">Email không được để trống</p>
            )}
            {validate.includes("incorrectEmail") && (
              <p className="error">Email không đúng định dạng</p>
            )}
            {validate.includes("existsEmail") && (
              <p className="error">Email đã tồn tại</p>
            )}
            {validate.includes("missEmail") && (
              <p className="error">Email không tìm thấy</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="role">Vai trò</label>
            <textarea
              onChange={handleChange}
              name="role"
              id=""
              value={inputAcc.role}
              style={{
                borderColor:
                  validate.includes("emptyRole") ||
                  validate.includes("longRole")
                    ? "#DC3545"
                    : "#bdbdbd",
              }}
            ></textarea>
            {validate.includes("emptyRole") && (
              <p className="error">Vai trò không được để trống</p>
            )}
            {validate.includes("longRole") && (
              <p className="error">Vai trò không được quá dài</p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-[23px] pt-[18px] pr-[22px] pb-[21px]">
          <button
            onClick={() => setOpen(false)}
            type="button"
            className="bg-[#6C757D]"
          >
            Hủy
          </button>
          <button className="bg-[#0D6EFD]">Lưu</button>
        </div>
      </form>
    </div>
  );
}

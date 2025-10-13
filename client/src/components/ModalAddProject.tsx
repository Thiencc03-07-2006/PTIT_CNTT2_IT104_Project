import type React from "react";
import "../style/ModalAddProject.css";
import { useEffect, useState } from "react";
import type { Project } from "../utils/type";
import axios from "axios";
import type { RootState } from "../redux/store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addProject, updateProject } from "../apis/projectApi";
import { toast } from "react-toastify";
interface props {
  setOpen: React.Dispatch<React.SetStateAction<string | boolean>>;
  typeEdit: string | boolean;
  projects: Project[];
}
export default function ModalAddProject({
  setOpen,
  typeEdit,
  projects,
}: props) {
  const [inputProject, setInputProject] = useState<Project>({
    id: "",
    projectName: "",
    image: "",
    members: [],
    description: "",
  });
  const [validate, setValidate] = useState<string[]>([]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputProject({ ...inputProject, [e.target.name]: e.target.value });
  };
  const nowUser = useSelector((state: RootState) => state.user.nowUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (typeof typeEdit !== "boolean") {
      const index = projects.findIndex((t) => t.id === typeEdit);
      if (index !== -1) setInputProject({ ...projects[index] });
    }
  }, [typeEdit]);
  const createId = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const array = new Uint8Array(4);
    crypto.getRandomValues(array);
    return Array.from(array, (x) => chars[x % chars.length]).join("");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const mess = [];
    if (
      !inputProject.projectName ||
      inputProject.projectName.trim().length === 0
    ) {
      mess.push("emptyName");
    } else {
      if (inputProject.projectName.length > 30) {
        mess.push("longName");
      } else {
        if (
          projects.some(
            (t) =>
              t.projectName.toLowerCase() ===
                inputProject.projectName.trim().toLowerCase() &&
              t.id !== inputProject.id
          )
        ) {
          mess.push("existsName");
        }
      }
    }
    if (typeof typeEdit === "boolean" && !file) {
      mess.push("emptyFile");
    }
    if (
      !inputProject.description ||
      inputProject.description.trim().length === 0
    ) {
      mess.push("emptyDescription");
    } else {
      if (inputProject.description.length > 100) {
        mess.push("longDescription");
      }
    }
    if (mess.length === 0) {
      setValidate(mess);
      try {
        let img = inputProject.image;
        if (file) {
          img = await hanldeUpload();
          if (!img) return;
        }
        if (typeof typeEdit === "boolean") {
          dispatch(
            addProject({
              ...inputProject,
              id: createId(),
              image: img,
              members: [{ userId: String(nowUser), role: "Project owner" }],
            })
          );
        } else {
          dispatch(updateProject({ ...inputProject, image: img }));
        }
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setValidate(mess);
    }
  };
  const [file, setFile] = useState("");
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = e.target.files[0];
    if (!temp) return;
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(temp.type)) {
      toast.warning("Vui lòng chọn đúng định dạng ảnh");
      e.target.value = "";
      return;
    }
    setFile(temp);
  };
  const hanldeUpload = async () => {
    if (!file) {
      alert("Vui long them file vao");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "re_upload");
    formData.append("cloud_name", "dk4uhrl7t");
    try {
      const res = await toast.promise(
        axios.post(
          "https://api.cloudinary.com/v1_1/dk4uhrl7t/image/upload",
          formData
        ),
        {
          pending: "Đang tải ảnh lên Cloudinary...",
          success: "Upload ảnh thành công",
          error: "Upload ảnh thất bại",
        }
      );
      return res.data.secure_url;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  return (
    <div className="modal_add">
      <form
        onSubmit={handleSubmit}
        className="box_input w-[480px] bg-white max-h-max rounded-[7px]"
      >
        <div className="p-[16px] pr-[24px] flex justify-between">
          <h1 className="modal_add_title">
            {typeof typeEdit === "boolean" ? "Thêm" : "Sửa"} dự án
          </h1>
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
            <label htmlFor="projectName">Tên dự án</label>
            <input
              onChange={handleChange}
              type="text"
              name="projectName"
              value={inputProject.projectName}
              style={{
                borderColor:
                  validate.includes("emptyName") ||
                  validate.includes("existsName") ||
                  validate.includes("longName")
                    ? "#DC3545"
                    : "#bdbdbd",
              }}
            />
            {validate.includes("emptyName") && (
              <p className="error">Tên dự án không được để trống</p>
            )}
            {validate.includes("existsName") && (
              <p className="error">Tên dự án đã tồn tại</p>
            )}
            {validate.includes("longName") && (
              <p className="error">Tên dự án không được quá dài</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="image">Hình ảnh dự án</label>
            <input
              onChange={handleChangeFile}
              type="file"
              name="image"
              style={{
                borderColor: validate.includes("emptyFile")
                  ? "#DC3545"
                  : "#bdbdbd",
              }}
            />
            {validate.includes("emptyFile") && (
              <p className="error">Hình ảnh dự án không được để trống</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="description">Mô tả dự án</label>
            <textarea
              onChange={handleChange}
              name="description"
              id=""
              value={inputProject.description}
              style={{
                borderColor:
                  validate.includes("emptyDescription") ||
                  validate.includes("longDescription")
                    ? "#DC3545"
                    : "#bdbdbd",
              }}
            ></textarea>
            {validate.includes("emptyDescription") && (
              <p className="error">Mô tả dự án không được để trống</p>
            )}
            {validate.includes("longDescription") && (
              <p className="error">Mô tả dự án không được quá dài</p>
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

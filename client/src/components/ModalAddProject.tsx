import type React from "react";
import "../style/ModalAddProject.css";
import { useState } from "react";
import type { Project } from "../utils/type";
import type { ProjectMember } from "../utils/type";
interface props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ModalAddProject({ setOpen }: props) {
  const [inputProject, setInputProject] = useState<Project>({
    id: "",
    projectName: "",
    image: "",
    members: [],
  });
  const [error] = useState(true);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputProject({ ...inputProject, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="modal_add">
      <form className="box_input w-[480px] bg-white max-h-max rounded-[7px]">
        <div className="p-[16px] pr-[24px] flex justify-between">
          <h1 className="modal_add_title">Thêm/sửa dự án</h1>
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
            <label htmlFor="nameProject">Tên dự án</label>
            <input
              onChange={handleChange}
              type="text"
              name="nameProject"
              style={{ borderColor: error ? "#DC3545" : "bdbdbd" }}
            />
            {error && <p className="error">Tên danh mục đã tồn tại</p>}
          </div>
          <div>
            <label htmlFor="image">Hình ảnh dự án</label>
            <input type="file" name="image" />
          </div>
          <div>
            <label htmlFor="description">Mô tả dự án</label>
            <textarea
              onChange={handleChange}
              name="description"
              id=""
            ></textarea>
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

import type React from "react";
import "../style/ModalAddProject.css";
import { useState } from "react";
interface props {
  setOpen: React.Dispatch<React.SetStateAction<string | boolean>>;
  typeEdit: string | boolean;
}
export default function ModalAddTask({ setOpen, typeEdit }: props) {
  const [error] = useState(true);
  return (
    <div className="modal_add">
      <form className="box_input w-[480px] bg-white max-h-max rounded-[7px]">
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
        <div
          style={{ paddingBottom: "20px" }}
          className="form_input flex gap-[21px] flex-col"
        >
          <div className="relative">
            <label htmlFor="nameTask">Tên nhệm vụ</label>
            <input
              type="text"
              name="nameTask"
              style={{ borderColor: error ? "#DC3545" : "bdbdbd" }}
            />
            {error && <p className="error">Tên danh mục đã tồn tại</p>}
          </div>
          <div className="relative">
            <label htmlFor="assignee">Người phụ trách</label>
            <select
              name="assignee"
              id=""
              style={{ borderColor: error ? "#DC3545" : "bdbdbd" }}
            ></select>
            {error && <p className="error">Tên danh mục đã tồn tại</p>}
          </div>
          <div className="relative">
            <label htmlFor="status">Trạng thái</label>
            <select
              name="status"
              id=""
              style={{ borderColor: error ? "#DC3545" : "bdbdbd" }}
            >
              <option value="">Chọn trạng thái nhiệm vụ</option>
              <option value="To do">To do</option>
              <option value="In progress">In progress</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
            {error && <p className="error">Tên danh mục đã tồn tại</p>}
          </div>
          <div className="relative">
            <label htmlFor="asignDate">Ngày bắt đầu</label>
            <input type="date" name="asignDate" />
            {error && <p className="error">Tên danh mục đã tồn tại</p>}
          </div>
          <div className="relative">
            <label htmlFor="dueDate">Hạn cuối</label>
            <input type="date" name="dueDate" />
            {error && <p className="error">Tên danh mục đã tồn tại</p>}
          </div>
          <div className="relative">
            <label htmlFor="priority">Độ ưu tiên</label>
            <select
              name="priority"
              id=""
              style={{ borderColor: error ? "#DC3545" : "bdbdbd" }}
            >
              <option value="">Chọn độ ưu tiên</option>
              <option value="Thấp">Thấp</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Cao">Cao</option>
            </select>
            {error && <p className="error">Tên danh mục đã tồn tại</p>}
          </div>
          <div className="relative">
            <label htmlFor="priority">Tiến độ</label>
            <select
              name="priority"
              id=""
              style={{ borderColor: error ? "#DC3545" : "bdbdbd" }}
            >
              <option value="">Chọn tiến độ</option>
              <option value="Đúng tiến độ">Đúng tiến độ</option>
              <option value="Có rủi ro">Có rủi ro</option>
              <option value="Trễ hạn">Trễ hạn</option>
            </select>
            {error && <p className="error">Tên danh mục đã tồn tại</p>}
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

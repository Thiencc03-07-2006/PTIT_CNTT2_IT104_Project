import type React from "react";
import "../style/ModalAddProject.css";
interface props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ModalDeleteTask({ setOpen }: props) {
  return (
    <div className="modal_add">
      <form className="box_input w-[480px] bg-white max-h-max rounded-[7px]">
        <div className="p-[16px] pr-[24px] flex justify-between">
          <h1 className="modal_add_title">Xác nhận xoá</h1>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="modal_add_close text-[18px] font-[900] text-[#818181]"
          >
            &#10005;
          </button>
        </div>
        <div className="form_input">
          <p style={{ margin: "-4px 0 20px -1px" }}>
            Bạn chắc chắn muốn xoá nhiệm vụ này này?
          </p>
        </div>
        <div className="flex justify-end gap-[23px] pt-[18px] pr-[22px] pb-[21px]">
          <button
            onClick={() => setOpen(false)}
            type="button"
            className="bg-[#6C757D]"
          >
            Hủy
          </button>
          <button className="bg-[#DC3545]">Xoá</button>
        </div>
      </form>
    </div>
  );
}

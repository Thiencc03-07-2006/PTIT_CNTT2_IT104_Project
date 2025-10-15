import type React from "react";
import "../style/ModalAddProject.css";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { toast } from "react-toastify";
import { deleteTask } from "../apis/taskApi";
import type { Project } from "../utils/type";
import type { deleteMember } from "../apis/projectApi";
interface props {
  open: string | boolean;
  setOpen: React.Dispatch<React.SetStateAction<string | boolean>>;
  project: Project;
}
export default function ModalDeleteMember({ open, setOpen, project }: props) {
  const dispatch = useAppDispatch();
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
            Bạn chắc chắn muốn xoá thành viên này?
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
          <button
            onClick={() => {
              dispatch(
                deleteMember({ id: project.id, memberId: String(open) })
              );
              toast.success("Xóa thành công");
              setOpen(false);
            }}
            className="bg-[#DC3545]"
          >
            Xoá
          </button>
        </div>
      </form>
    </div>
  );
}

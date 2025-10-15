import type React from "react";
import "../style/ModalAddProject.css";
import type { Project } from "../utils/type";
import type { User } from "../utils/type";
import { Trash2 } from "lucide-react";
interface props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project | null>>;
  users: User[];
  setOpenDelete: React.Dispatch<React.SetStateAction<string | boolean>>;
}
export default function ModalMemberList({
  setOpen,
  project,
  users,
  setOpenDelete,
}: props) {
  return (
    <div className="modal_add">
      <form className="box_input w-[598px] bg-white max-h-max rounded-[7px]">
        <div className="p-[16px] pr-[24px] flex justify-between">
          <h1 className="modal_add_title">Thành viên</h1>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="modal_add_close text-[18px] font-[900] text-[#818181]"
          >
            &#10005;
          </button>
        </div>
        <div className="form_input flex gap-[21px] flex-col">
          <table>
            <thead>
              <tr>
                <th>Thành viên</th>
                <th>Vai trò</th>
              </tr>
            </thead>
            <tbody>
              {project.members.map((t) => {
                const member = users.find((t2) => t2.id === t.userId);
                if (!member) {
                  return "";
                }
                return (
                  <tr>
                    <td>
                      <div className="flex gap-[16px]">
                        <div>
                          <img
                            className="size-[40px] rounded-full"
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              member?.fullName
                            )}&background=random&color=fff`}
                            alt=""
                          />
                        </div>
                        <div>
                          <p>{member.fullName}</p>
                          <p>{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-[15.44px]">
                        <input
                          style={{
                            fontWeight: 400,
                            fontStyle: "normal",
                            fontSize: "12px",
                            lineHeight: "100%",
                            height: "26px",
                          }}
                          type="text"
                          placeholder={t.role}
                          defaultValue={t.role}
                          disabled={t.role === "Project owner"}
                        />
                        <div
                          // onClick={() => setOpenDelete(t.userId)}
                          className="text-[#DC3545]"
                        >
                          <Trash2 />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

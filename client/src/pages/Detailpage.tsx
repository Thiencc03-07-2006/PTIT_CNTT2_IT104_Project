import { useState } from "react";
import { Ellipsis } from "lucide-react";
import { ChevronDown } from "lucide-react";
import "../style/detail.css";
import testDetailimg from "../assets/testDetailpng.png";
import ModalAddTask from "../components/ModalAddTask";
import ModalDeleteTask from "../components/ModalDeleteTask";
export default function Detail() {
  const [toggleDown, setToggleDown] = useState<{
    todo: boolean;
    inProgress: boolean;
    pending: boolean;
    done: boolean;
  }>({ todo: true, inProgress: true, pending: true, done: true });
  const [typeEdit, setTypeEdit] = useState<string | boolean>(false);
  const [openDelete, setOpenDelete] = useState(false);
  const user = [
    { id: 1, name: "An Nguyễn", role: "Project owner" },
    { id: 2, name: "Bách Nguyễn", role: "Frontend developer" },
  ];
  function stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(
      Math.abs(Math.sin(hash) * 16777215) % 16777215
    ).toString(16);
    return "#" + color.padStart(6, "0");
  }
  const handleOpen = (type: "todo" | "inProgress" | "pending" | "done") => {
    setToggleDown({ ...toggleDown, [type]: !toggleDown[type] });
  };
  const test = [
    {
      id: "1",
      taskName: "Soạn thảo đề cương dự án",
      assigneeId: "An Nguyễn",
      projectId: "p01",
      asignDate: "2025-02-24",
      dueDate: "2025-02-27",
      priority: "Thấp",
      progress: "Đúng tiến độ",
      status: "To do",
    },
    {
      id: "5",
      taskName: "Soạn thảo đề cương dự án",
      assigneeId: "An Nguyễn",
      projectId: "p01",
      asignDate: "2025-02-24",
      dueDate: "2025-02-27",
      priority: "Thấp",
      progress: "Đúng tiến độ",
      status: "Done",
    },
    {
      id: "2",
      taskName: "Soạn thảo đề cương dự án",
      assigneeId: "An Nguyễn",
      projectId: "p01",
      asignDate: "2025-02-24",
      dueDate: "2025-02-27",
      priority: "Trung bình",
      progress: "Có rủi ro",
      status: "To do",
    },
    {
      id: "6",
      taskName: "Soạn thảo đề cương dự án",
      assigneeId: "An Nguyễn",
      projectId: "p01",
      asignDate: "2025-02-24",
      dueDate: "2025-02-27",
      priority: "Trung bình",
      progress: "Có rủi ro",
      status: "Pending",
    },
    {
      id: "3",
      taskName: "Soạn thảo đề cương dự án",
      assigneeId: "An Nguyễn",
      projectId: "p01",
      asignDate: "2025-02-24",
      dueDate: "2025-02-27",
      priority: "Cao",
      progress: "Trễ hạn",
      status: "To do",
    },
    {
      id: "4",
      taskName: "Soạn thảo đề cương dự án",
      assigneeId: "An Nguyễn",
      projectId: "p01",
      asignDate: "2025-02-24",
      dueDate: "2025-02-27",
      priority: "Cao",
      progress: "Trễ hạn",
      status: "In progress",
    },
  ];
  return (
    <div className="w-[1290px] detail">
      <div className="flex justify-between flex-wrap gap-[24px]">
        <div>
          <h1 className="title_management">
            Xây dựng website thương mại điện tử
          </h1>
          <div>
            <div className="w-[648px] flex gap-[31px] mt-[15px]">
              <div>
                <img src={testDetailimg} alt="" />
              </div>
              <p>
                Dự án nhằm phát triển một nền tảng thương mại điện tử với các
                tính năng như giỏ hàng, thanh toán và quản lý sản phẩm.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-[16px]">
            <h3 className="title_detail">Thành viên</h3>
            <button className="add_member_to_project border border-[#6C757D] rounded-[4px] h-[31px] w-[132px] bg-white">
              + Thêm thành viên
            </button>
          </div>
          <div className="flex gap-[25px]">
            <div className="grid grid-cols-2 gap-[25px]">
              {user.map((t) => {
                const lessName = t.name
                  .trim()
                  .split(" ")
                  .map((word) => word[0])
                  .join("");
                return (
                  <div key={t.id} className="itemMember flex gap-[8px]">
                    <div
                      className={`size-[40px] rounded-full flex justify-center items-center`}
                      style={{ backgroundColor: stringToColor(lessName) }}
                    >
                      {lessName}
                    </div>
                    <div>
                      <h4>{t.name}</h4>
                      <p>{t.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="size-[40px] rounded-full bg-[#E2E3E5] flex justify-center items-center text-[15px] font-[900] relative top-[1px]">
              <Ellipsis />
            </div>
          </div>
        </div>
      </div>
      <div className="add_search_detail flex justify-between mt-[18px] mb-[19px]">
        <button
          onClick={() => setTypeEdit(true)}
          className="bg-[#0D6EFD] text-[#FFFFFF] w-[155px] h-[38px] border-[0] text-center"
        >
          + Thêm nhiệm vụ
        </button>
        <div className="flex gap-[16px]">
          <div className="relative">
            <select
              style={{ padding: "6px 12px" }}
              className="w-[150px] h-[38px] appearance-none"
              name=""
              id=""
            >
              <option value="">Sắp xếp theo</option>
              <option value=""></option>
            </select>
            <ChevronDown
              style={{ border: "none" }}
              className="absolute top-[7px] right-[6.5px]"
            ></ChevronDown>
          </div>

          <input
            className="w-[220px] h-[38px] pl-[13px]"
            type="text"
            placeholder="Tìm kiếm nhiệm vụ"
          />
        </div>
      </div>
      <div
        style={{ boxShadow: "0px 5px 5px 0px #00000033" }}
        className="table_detail rounded-[6px] border border-[#0000002D] p-[17px] mb-[88px]"
      >
        <div>
          <h1 className="title_detail mb-[8px]">Danh Sách Nhiệm Vụ</h1>
        </div>
        <table className="w-full border border-[#DFE0E1]">
          <thead>
            <tr>
              <th className="">Tên Nhiệm Vụ</th>
              <th className="w-[189px]">Người Phụ Trách</th>
              <th className="w-[126px]">Ưu Tiên</th>
              <th className="w-[162px]">Ngày Bắt Đầu</th>
              <th className="w-[117px]">Hạn Chót</th>
              <th className="w-[142px]">Tiến độ</th>
              <th className="w-[146px]">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <div
              onClick={() => handleOpen("todo")}
              className="name_status_detail flex gap-[4px] w-100% text-[#212529] h-[48px] items-center p-[12px] max-w-max cursor-pointer"
            >
              <div
                style={{ transform: `rotate(${toggleDown.todo ? 0 : -90}deg)` }}
              >
                ▼
              </div>
              Todo
            </div>
            {toggleDown.todo && (
              <>
                {test
                  .filter((t) => t.status === "To do")
                  .map((t) => (
                    <tr key={t.id} className="">
                      <td>{t.taskName}</td>
                      <td>{t.assigneeId}</td>
                      <td>
                        <div className="flex justify-center">
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: "11.12px",
                              lineHeight: "16px",
                            }}
                            className={`rounded-[6px] pl-[8px] pr-[8px] h-[20px] flex items-center justify-center max-w-max text-white ${
                              t.priority === "Cao"
                                ? "bg-[#DC3545]"
                                : t.priority === "Trung bình"
                                ? "bg-[#FFA500]"
                                : "bg-[#0DCAF0]"
                            }`}
                          >
                            {t.priority}
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "#0D6EFD" }}>02 - 24</td>
                      <td style={{ color: "#0D6EFD" }}>02 - 27</td>
                      <td>
                        <div className="flex justify-center">
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: "11.12px",
                              lineHeight: "16px",
                            }}
                            className={`rounded-[6px] pl-[8px] pr-[8px] h-[20px] flex items-center justify-center max-w-max text-white ${
                              t.progress === "Trễ hạn"
                                ? "bg-[#DC3545]"
                                : t.progress === "Có rủi ro"
                                ? "bg-[#FFA500]"
                                : "bg-[#198754]"
                            }`}
                          >
                            {t.progress}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-[14.75px] justify-center">
                          <button
                            onClick={() => setTypeEdit(t.id)}
                            className="w-[43px] h-[31px] rounded-[4px] bg-[#FFC107]"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => setOpenDelete(true)}
                            className="w-[43px] h-[31px] rounded-[4px] bg-[#DC3545] text-[#ffffff]"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </>
            )}
            <div
              onClick={() => handleOpen("inProgress")}
              className="name_status_detail flex gap-[4px] w-100% text-[#212529] h-[48px] items-center p-[12px] max-w-max cursor-pointer"
            >
              <div
                style={{
                  transform: `rotate(${toggleDown.inProgress ? 0 : -90}deg)`,
                }}
              >
                ▼
              </div>
              In Progress
            </div>
            {toggleDown.inProgress && (
              <>
                {test
                  .filter((t) => t.status === "In progress")
                  .map((t) => (
                    <tr key={t.id} className="">
                      <td>{t.taskName}</td>
                      <td>{t.assigneeId}</td>
                      <td>
                        <div className="flex justify-center">
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: "11.12px",
                              lineHeight: "16px",
                            }}
                            className={`rounded-[6px] pl-[8px] pr-[8px] h-[20px] flex items-center justify-center max-w-max text-white ${
                              t.priority === "Cao"
                                ? "bg-[#DC3545]"
                                : t.priority === "Trung bình"
                                ? "bg-[#FFA500]"
                                : "bg-[#0DCAF0]"
                            }`}
                          >
                            {t.priority}
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "#0D6EFD" }}>02 - 24</td>
                      <td style={{ color: "#0D6EFD" }}>02 - 27</td>
                      <td>
                        <div className="flex justify-center">
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: "11.12px",
                              lineHeight: "16px",
                            }}
                            className={`rounded-[6px] pl-[8px] pr-[8px] h-[20px] flex items-center justify-center max-w-max text-white ${
                              t.progress === "Trễ hạn"
                                ? "bg-[#DC3545]"
                                : t.progress === "Có rủi ro"
                                ? "bg-[#FFA500]"
                                : "bg-[#198754]"
                            }`}
                          >
                            {t.progress}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-[14.75px] justify-center">
                          <button
                            onClick={() => setTypeEdit(t.id)}
                            className="w-[43px] h-[31px] rounded-[4px] bg-[#FFC107]"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => setOpenDelete(true)}
                            className="w-[43px] h-[31px] rounded-[4px] bg-[#DC3545] text-[#ffffff]"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </>
            )}
            <div
              onClick={() => handleOpen("pending")}
              className="name_status_detail flex gap-[4px] w-100% text-[#212529] h-[48px] items-center p-[12px] max-w-max cursor-pointer"
            >
              <div
                style={{
                  transform: `rotate(${toggleDown.pending ? 0 : -90}deg)`,
                }}
              >
                ▼
              </div>
              Pending
            </div>
            {toggleDown.pending && (
              <>
                {test
                  .filter((t) => t.status === "Pending")
                  .map((t) => (
                    <tr key={t.id} className="">
                      <td>{t.taskName}</td>
                      <td>{t.assigneeId}</td>
                      <td>
                        <div className="flex justify-center">
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: "11.12px",
                              lineHeight: "16px",
                            }}
                            className={`rounded-[6px] pl-[8px] pr-[8px] h-[20px] flex items-center justify-center max-w-max text-white ${
                              t.priority === "Cao"
                                ? "bg-[#DC3545]"
                                : t.priority === "Trung bình"
                                ? "bg-[#FFA500]"
                                : "bg-[#0DCAF0]"
                            }`}
                          >
                            {t.priority}
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "#0D6EFD" }}>02 - 24</td>
                      <td style={{ color: "#0D6EFD" }}>02 - 27</td>
                      <td>
                        <div className="flex justify-center">
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: "11.12px",
                              lineHeight: "16px",
                            }}
                            className={`rounded-[6px] pl-[8px] pr-[8px] h-[20px] flex items-center justify-center max-w-max text-white ${
                              t.progress === "Trễ hạn"
                                ? "bg-[#DC3545]"
                                : t.progress === "Có rủi ro"
                                ? "bg-[#FFA500]"
                                : "bg-[#198754]"
                            }`}
                          >
                            {t.progress}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-[14.75px] justify-center">
                          <button
                            onClick={() => setTypeEdit(t.id)}
                            className="w-[43px] h-[31px] rounded-[4px] bg-[#FFC107]"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => setOpenDelete(true)}
                            className="w-[43px] h-[31px] rounded-[4px] bg-[#DC3545] text-[#ffffff]"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </>
            )}
            <div
              onClick={() => handleOpen("done")}
              className="name_status_detail flex gap-[4px] w-100% text-[#212529] h-[48px] items-center p-[12px] max-w-max cursor-pointer"
            >
              <div
                style={{
                  transform: `rotate(${toggleDown.done ? 0 : -90}deg)`,
                }}
              >
                ▼
              </div>
              Done
            </div>
            {toggleDown.done && (
              <>
                {test
                  .filter((t) => t.status === "Done")
                  .map((t) => (
                    <tr key={t.projectId} className="">
                      <td>{t.taskName}</td>
                      <td>{t.assigneeId}</td>
                      <td>
                        <div className="flex justify-center">
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: "11.12px",
                              lineHeight: "16px",
                            }}
                            className={`rounded-[6px] pl-[8px] pr-[8px] h-[20px] flex items-center justify-center max-w-max text-white ${
                              t.priority === "Cao"
                                ? "bg-[#DC3545]"
                                : t.priority === "Trung bình"
                                ? "bg-[#FFA500]"
                                : "bg-[#0DCAF0]"
                            }`}
                          >
                            {t.priority}
                          </div>
                        </div>
                      </td>
                      <td style={{ color: "#0D6EFD" }}>02 - 24</td>
                      <td style={{ color: "#0D6EFD" }}>02 - 27</td>
                      <td>
                        <div className="flex justify-center">
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: "11.12px",
                              lineHeight: "16px",
                            }}
                            className={`rounded-[6px] pl-[8px] pr-[8px] h-[20px] flex items-center justify-center max-w-max text-white ${
                              t.progress === "Trễ hạn"
                                ? "bg-[#DC3545]"
                                : t.progress === "Có rủi ro"
                                ? "bg-[#FFA500]"
                                : "bg-[#198754]"
                            }`}
                          >
                            {t.progress}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex gap-[14.75px] justify-center">
                          <button
                            onClick={() => setTypeEdit(t.id)}
                            className="w-[43px] h-[31px] rounded-[4px] bg-[#FFC107]"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => setOpenDelete(true)}
                            className="w-[43px] h-[31px] rounded-[4px] bg-[#DC3545] text-[#ffffff]"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      {typeEdit && <ModalAddTask setOpen={setTypeEdit} typeEdit={typeEdit} />}
      {openDelete && <ModalDeleteTask setOpen={setOpenDelete} />}
    </div>
  );
}

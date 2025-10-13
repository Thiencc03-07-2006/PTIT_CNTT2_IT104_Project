import React, { useEffect, useState } from "react";
import { Ellipsis } from "lucide-react";
import { ChevronDown } from "lucide-react";
import "../style/detail.css";
import ModalAddTask from "../components/ModalAddTask";
import ModalDeleteTask from "../components/ModalDeleteTask";
import { useParams } from "react-router-dom";
import type { Project } from "../utils/type";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchTaskDataOfProject } from "../apis/taskApi";
import { toast } from "react-toastify";
import ModalAddMember from "../components/ModalAddMember";
import { fetchProjectData } from "../apis/projectApi";
import ModalMemberList from "../components/ModalMemberList";
export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const dispatch = useAppDispatch();
  const priorityOrder = {
    Cao: 3,
    "Trung bình": 2,
    Thấp: 1,
    "": 0,
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch(() => toast.error("Dự án không tồn tại"))
      .finally(() => dispatch(fetchTaskDataOfProject(id)));
  }, [id]);
  useEffect(() => {
    dispatch(fetchProjectData());
  }, [dispatch]);

  const { users } = useSelector((state: RootState) => state.user);
  const [sortMuti, setSortMuti] = useState<{ search: string; sort: string }>({
    search: "",
    sort: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setSortMuti({ ...sortMuti, [e.target.name]: e.target.value });
  const [toggleDown, setToggleDown] = useState<{
    todo: boolean;
    inProgress: boolean;
    pending: boolean;
    done: boolean;
  }>({ todo: true, inProgress: true, pending: true, done: true });
  const [typeEdit, setTypeEdit] = useState<string | boolean>(false);
  const [openDelete, setOpenDelete] = useState<string | boolean>(false);
  const [openAddMember, setOpenAddMember] = useState(false);
  const [openMemberList, setOpenMemberList] = useState(false);
  const handleOpen = (type: "todo" | "inProgress" | "pending" | "done") => {
    setToggleDown({ ...toggleDown, [type]: !toggleDown[type] });
  };
  return (
    <div className="w-[1290px] detail">
      <div className="flex justify-between flex-wrap gap-[24px]">
        <div>
          <h1 className="title_management">{project?.projectName}</h1>
          <div>
            <div className="w-[648px] flex gap-[31px] mt-[15px]">
              <div>
                <img
                  style={{ maxWidth: "218px", maxHeight: "163px" }}
                  src={project?.image}
                  alt=""
                />
              </div>
              <p>{project?.description}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-[16px]">
            <h3 className="title_detail">Thành viên</h3>
            <button
              onClick={() => setOpenAddMember(true)}
              className="add_member_to_project border border-[#6C757D] rounded-[4px] h-[31px] w-[132px] bg-white"
            >
              + Thêm thành viên
            </button>
          </div>
          <div className="flex gap-[25px]">
            <div className="grid grid-cols-2 gap-[25px]">
              {project?.members.slice(0, 4).map((t) => {
                const fullName = users.find(
                  (t2) => t2.id === t.userId
                )?.fullName;
                if (fullName) {
                  return (
                    <div key={t.userId} className="itemMember flex gap-[8px]">
                      <div>
                        <img
                          className="size-[40px] rounded-full"
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            fullName
                          )}&background=random&color=fff`}
                          alt=""
                        />
                      </div>
                      <div>
                        <h4>{fullName}</h4>
                        <p>{t.role}</p>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div
              onClick={() => setOpenMemberList(true)}
              className="size-[40px] rounded-full bg-[#E2E3E5] flex justify-center items-center text-[15px] font-[900] relative top-[1px]"
            >
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
              onChange={handleChange}
              style={{ padding: "6px 12px" }}
              className="w-[150px] h-[38px] appearance-none"
              name="sort"
              id=""
            >
              <option value="">Sắp xếp theo</option>
              <option value="priority">Độ ưu tiên</option>
              <option value="deadline">Hạn cuối</option>
            </select>
            <ChevronDown
              style={{ border: "none" }}
              className="absolute top-[7px] right-[6.5px]"
            ></ChevronDown>
          </div>

          <input
            onChange={handleChange}
            name="search"
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
                {tasks
                  .filter(
                    (t) =>
                      t.status === "To do" &&
                      t.taskName
                        .toLowerCase()
                        .includes(sortMuti.search.toLowerCase())
                  )
                  .sort((a, b) =>
                    sortMuti.sort === "priority"
                      ? priorityOrder[b.priority] - priorityOrder[a.priority]
                      : sortMuti.sort === "deadline"
                      ? new Date(a.dueDate).getTime() -
                        new Date(b.dueDate).getTime()
                      : 0
                  )
                  .map((t) => {
                    const start = new Date(t.asignDate);
                    const end = new Date(t.dueDate);
                    return (
                      <tr key={t.id} className="">
                        <td>{t.taskName}</td>
                        <td>
                          {users.find((t2) => t2.id === t.assigneeId)?.fullName}
                        </td>
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
                        <td style={{ color: "#0D6EFD" }}>
                          {start.getDate() + " - " + (start.getMonth() + 1)}
                        </td>
                        <td style={{ color: "#0D6EFD" }}>
                          {end.getDate() + " - " + (end.getMonth() + 1)}
                        </td>
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
                              onClick={() => setOpenDelete(t.id)}
                              className="w-[43px] h-[31px] rounded-[4px] bg-[#DC3545] text-[#ffffff]"
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
                {tasks
                  .filter(
                    (t) =>
                      t.status === "In progress" &&
                      t.taskName
                        .toLowerCase()
                        .includes(sortMuti.search.toLowerCase())
                  )
                  .sort((a, b) =>
                    sortMuti.sort === "priority"
                      ? priorityOrder[b.priority] - priorityOrder[a.priority]
                      : sortMuti.sort === "deadline"
                      ? new Date(a.dueDate).getTime() -
                        new Date(b.dueDate).getTime()
                      : 0
                  )
                  .map((t) => {
                    const start = new Date(t.asignDate);
                    const end = new Date(t.dueDate);
                    return (
                      <tr key={t.id} className="">
                        <td>{t.taskName}</td>
                        <td>
                          {users.find((t2) => t2.id === t.assigneeId)?.fullName}
                        </td>
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
                        <td style={{ color: "#0D6EFD" }}>
                          {start.getDate() + " - " + (start.getMonth() + 1)}
                        </td>
                        <td style={{ color: "#0D6EFD" }}>
                          {end.getDate() + " - " + (end.getMonth() + 1)}
                        </td>
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
                              onClick={() => setOpenDelete(t.id)}
                              className="w-[43px] h-[31px] rounded-[4px] bg-[#DC3545] text-[#ffffff]"
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
                {tasks
                  .filter(
                    (t) =>
                      t.status === "Pending" &&
                      t.taskName
                        .toLowerCase()
                        .includes(sortMuti.search.toLowerCase())
                  )
                  .sort((a, b) =>
                    sortMuti.sort === "priority"
                      ? priorityOrder[b.priority] - priorityOrder[a.priority]
                      : sortMuti.sort === "deadline"
                      ? new Date(a.dueDate).getTime() -
                        new Date(b.dueDate).getTime()
                      : 0
                  )
                  .map((t) => {
                    const start = new Date(t.asignDate);
                    const end = new Date(t.dueDate);
                    return (
                      <tr key={t.id} className="">
                        <td>{t.taskName}</td>
                        <td>
                          {users.find((t2) => t2.id === t.assigneeId)?.fullName}
                        </td>
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
                        <td style={{ color: "#0D6EFD" }}>
                          {start.getDate() + " - " + (start.getMonth() + 1)}
                        </td>
                        <td style={{ color: "#0D6EFD" }}>
                          {end.getDate() + " - " + (end.getMonth() + 1)}
                        </td>
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
                              onClick={() => setOpenDelete(t.id)}
                              className="w-[43px] h-[31px] rounded-[4px] bg-[#DC3545] text-[#ffffff]"
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
                {tasks
                  .filter(
                    (t) =>
                      t.status === "Done" &&
                      t.taskName
                        .toLowerCase()
                        .includes(sortMuti.search.toLowerCase())
                  )
                  .sort((a, b) =>
                    sortMuti.sort === "priority"
                      ? priorityOrder[b.priority] - priorityOrder[a.priority]
                      : sortMuti.sort === "deadline"
                      ? new Date(a.dueDate).getTime() -
                        new Date(b.dueDate).getTime()
                      : 0
                  )
                  .map((t) => {
                    const start = new Date(t.asignDate);
                    const end = new Date(t.dueDate);
                    return (
                      <tr key={t.id} className="">
                        <td>{t.taskName}</td>
                        <td>
                          {users.find((t2) => t2.id === t.assigneeId)?.fullName}
                        </td>
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
                        <td style={{ color: "#0D6EFD" }}>
                          {start.getDate() + " - " + (start.getMonth() + 1)}
                        </td>
                        <td style={{ color: "#0D6EFD" }}>
                          {end.getDate() + " - " + (end.getMonth() + 1)}
                        </td>
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
                              onClick={() => setOpenDelete(t.id)}
                              className="w-[43px] h-[31px] rounded-[4px] bg-[#DC3545] text-[#ffffff]"
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </>
            )}
          </tbody>
        </table>
      </div>
      {typeEdit && project && (
        <ModalAddTask
          setOpen={setTypeEdit}
          typeEdit={typeEdit}
          tasks={tasks}
          project={project}
          users={users}
        />
      )}
      {openDelete && (
        <ModalDeleteTask open={openDelete} setOpen={setOpenDelete} />
      )}
      {project && openAddMember && (
        <ModalAddMember
          setOpen={setOpenAddMember}
          project={project}
          users={users}
          setProject={setProject}
        />
      )}
      {project && openMemberList && (
        <ModalMemberList
          setOpen={setOpenMemberList}
          project={project}
          users={users}
          setProject={setProject}
        />
      )}
    </div>
  );
}

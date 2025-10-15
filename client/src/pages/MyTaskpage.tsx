import React, { useEffect, useState } from "react";
import { Ellipsis, NotebookPen } from "lucide-react";
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
import { fetchTaskDataOfProject, fetchTaskDataOfUser } from "../apis/taskApi";
import { toast } from "react-toastify";
import ModalAddMember from "../components/ModalAddMember";
import { fetchProjectData } from "../apis/projectApi";
import ModalMemberList from "../components/ModalMemberList";
export default function MyTask() {
  const projects = useSelector((state: RootState) => state.project.projects);
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const idUser = useSelector((state: RootState) => state.user.nowUser);
  const dispatch = useAppDispatch();
  const projectsFilter = projects.filter((t) =>
    tasks.some((t2) => t2.projectId === t.id)
  );

  const priorityOrder = {
    Cao: 3,
    "Trung bình": 2,
    Thấp: 1,
    "": 0,
  };
  useEffect(() => {
    dispatch(fetchProjectData());
    dispatch(fetchTaskDataOfUser(idUser));
  }, [dispatch]);
  useEffect(() => {
    if (projects.length > 0) {
      const initial = projects.reduce((a, b) => {
        a[b.projectName] = true;
        return a;
      }, {});
      setToggleDown(initial);
    }
  }, [projects]);

  const { users } = useSelector((state: RootState) => state.user);
  const [sortMuti, setSortMuti] = useState<{ search: string; sort: string }>({
    search: "",
    sort: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setSortMuti({ ...sortMuti, [e.target.name]: e.target.value });
  const [toggleDown, setToggleDown] = useState({
    todo: true,
    inProgress: true,
    pending: true,
    done: true,
  });
  const handleOpen = (type: string) => {
    setToggleDown({ ...toggleDown, [type]: !toggleDown[type] });
  };
  return (
    <div className="w-[1290px] detail">
      <div className="flex justify-between flex-wrap gap-[24px]">
        <div>
          <h1 className="title_management">Quản lý nhiệm vụ</h1>
        </div>
        <div></div>
      </div>
      <div className="add_search_detail flex justify-between mt-[18px] mb-[19px]">
        <div></div>
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
              <th className="w-[126px]">Ưu Tiên</th>
              <th className="w-[189px]">Trạng thái</th>
              <th className="w-[162px]">Ngày Bắt Đầu</th>
              <th className="w-[117px]">Hạn Chót</th>
              <th className="w-[142px]">Tiến độ</th>
            </tr>
          </thead>
          <tbody>
            {projectsFilter.map((t) => (
              <>
                <div
                  onClick={() => handleOpen(t.projectName)}
                  className="name_status_detail flex gap-[4px] w-100% text-[#212529] h-[48px] items-center p-[12px] max-w-max cursor-pointer"
                >
                  <div
                    style={{
                      transform: `rotate(${
                        toggleDown[t.projectName] ? 0 : -90
                      }deg)`,
                    }}
                  >
                    ▼
                  </div>
                  {t.projectName}
                </div>
                {toggleDown[t.projectName] && (
                  <>
                    {tasks
                      .filter(
                        (t2) =>
                          t2.projectId === t.id &&
                          t2.taskName
                            .toLowerCase()
                            .includes(sortMuti.search.toLowerCase())
                      )
                      .sort((a, b) =>
                        sortMuti.sort === "priority"
                          ? priorityOrder[b.priority] -
                            priorityOrder[a.priority]
                          : sortMuti.sort === "deadline"
                          ? new Date(a.dueDate).getTime() -
                            new Date(b.dueDate).getTime()
                          : 0
                      )
                      .map((t2) => {
                        const start = new Date(t2.asignDate);
                        const end = new Date(t2.dueDate);
                        return (
                          <tr key={t2.id}>
                            <td>{t2.taskName}</td>
                            <td>
                              <div className="flex justify-center">
                                <div
                                  style={{
                                    fontWeight: 800,
                                    fontSize: "11.12px",
                                    lineHeight: "16px",
                                  }}
                                  className={`rounded-[6px] pl-[8px] pr-[8px] h-[20px] flex items-center justify-center max-w-max text-white ${
                                    t2.priority === "Cao"
                                      ? "bg-[#DC3545]"
                                      : t2.priority === "Trung bình"
                                      ? "bg-[#FFA500]"
                                      : "bg-[#0DCAF0]"
                                  }`}
                                >
                                  {t2.priority}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="flex justify-center gap-[5px]">
                                {t2.status} <NotebookPen />
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
                                    t2.progress === "Trễ hạn"
                                      ? "bg-[#DC3545]"
                                      : t2.progress === "Có rủi ro"
                                      ? "bg-[#FFA500]"
                                      : "bg-[#198754]"
                                  }`}
                                >
                                  {t2.progress}
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

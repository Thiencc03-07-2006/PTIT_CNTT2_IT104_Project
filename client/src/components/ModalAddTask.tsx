import type React from "react";
import "../style/ModalAddProject.css";
import { useEffect, useState } from "react";
import type { User } from "../utils/type";
import type { Task } from "../utils/type";
import type { Project } from "../utils/type";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addTask, updateTask } from "../apis/taskApi";
interface props {
  setOpen: React.Dispatch<React.SetStateAction<string | boolean>>;
  typeEdit: string | boolean;
  users: User[];
  tasks: Task[];
  project: Project;
}
export default function ModalAddTask({
  setOpen,
  typeEdit,
  users,
  tasks,
  project,
}: props) {
  const [validate, setValidate] = useState<string[]>([]);
  const [inputTask, setInputTask] = useState<Task>({
    id: "",
    taskName: "",
    assigneeId: "",
    projectId: "",
    asignDate: "",
    dueDate: "",
    priority: "",
    progress: "",
    status: "",
  });
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (typeof typeEdit !== "boolean") {
      const index = tasks.findIndex((t) => t.id === typeEdit);
      if (index !== -1) setInputTask({ ...tasks[index] });
    }
  }, [typeEdit, tasks]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputTask({ ...inputTask, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mess = [];
    if (!inputTask.taskName || inputTask.taskName.trim().length === 0) {
      mess.push("emptyName");
    } else {
      if (inputTask.taskName.length > 30) {
        mess.push("longName");
      } else {
        if (
          tasks.some(
            (t) =>
              t.taskName.toLowerCase() ===
                inputTask.taskName.trim().toLowerCase() && t.id !== inputTask.id
          )
        ) {
          mess.push("existsName");
        }
      }
    }
    if (!inputTask.assigneeId || inputTask.assigneeId.trim().length === 0) {
      mess.push("emptyAssignee");
    }
    if (!inputTask.status || inputTask.status.trim().length === 0) {
      mess.push("emptyStatus");
    }
    if (!inputTask.priority || inputTask.priority.trim().length === 0) {
      mess.push("emptyPriority");
    }
    if (!inputTask.progress || inputTask.progress.trim().length === 0) {
      mess.push("emptyProgress");
    }
    if (!inputTask.asignDate || inputTask.asignDate.trim().length === 0) {
      mess.push("emptyAsignDate");
    } else {
      if (new Date(inputTask.asignDate) < new Date()) {
        mess.push("futureAsignDate");
      }
    }
    if (!inputTask.dueDate || inputTask.dueDate.trim().length === 0) {
      mess.push("emptyDueDate");
    } else {
      if (
        inputTask.asignDate &&
        new Date(inputTask.asignDate) > new Date(inputTask.dueDate)
      ) {
        mess.push("futureDueDate");
      }
    }
    if (mess.length === 0) {
      if (typeof typeEdit === "boolean") {
        dispatch(
          addTask({
            ...inputTask,
            id: crypto.randomUUID(),
            projectId: project.id,
          })
        );
      } else {
        dispatch(updateTask({ ...inputTask }));
      }
      setOpen(false);
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
          <h1 className="modal_add_title">
            {typeof typeEdit === "boolean" ? "Thêm" : "Sửa"} nhệm vụ
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
            <label htmlFor="taskName">Tên nhệm vụ</label>
            <input
              onChange={handleChange}
              value={inputTask.taskName}
              type="text"
              name="taskName"
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
              <p className="error">Tên nhệm vụ không được để trống</p>
            )}
            {validate.includes("existsName") && (
              <p className="error">Tên nhệm vụ đã tồn tại</p>
            )}
            {validate.includes("longName") && (
              <p className="error">Tên nhệm vụ không được quá dài</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="assigneeId">Người phụ trách</label>
            <select
              onChange={handleChange}
              value={inputTask.assigneeId}
              name="assigneeId"
              id=""
              style={{
                borderColor: validate.includes("emptyAssignee")
                  ? "#DC3545"
                  : "#bdbdbd",
              }}
            >
              <option value="">Chọn người phụ trách</option>
              {project.members &&
                project.members.map((t) => (
                  <option key={t.userId} value={t.userId}>
                    {users.find((t2) => t2.id === t.userId)?.fullName}
                  </option>
                ))}
            </select>
            {validate.includes("emptyAssignee") && (
              <p className="error">Người phụ trách không được để trống</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="status">Trạng thái</label>
            <select
              onChange={handleChange}
              value={inputTask.status}
              name="status"
              id=""
              style={{
                borderColor: validate.includes("emptyStatus")
                  ? "#DC3545"
                  : "#bdbdbd",
              }}
            >
              <option value="">Chọn trạng thái nhiệm vụ</option>
              <option value="To do">To do</option>
              <option value="In progress">In progress</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
            {validate.includes("emptyStatus") && (
              <p className="error">Trạng thái không được để trống</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="asignDate">Ngày bắt đầu</label>
            <input
              onChange={handleChange}
              value={inputTask.asignDate}
              style={{
                borderColor:
                  validate.includes("emptyAsignDate") ||
                  validate.includes("futureAsignDate")
                    ? "#DC3545"
                    : "#bdbdbd",
              }}
              type="date"
              name="asignDate"
            />
            {validate.includes("emptyAsignDate") && (
              <p className="error">Ngày bắt đầu không được để trống</p>
            )}
            {validate.includes("futureAsignDate") && (
              <p className="error">Ngày bắt đầu không được trước hiện tại</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="dueDate">Hạn cuối</label>
            <input
              onChange={handleChange}
              value={inputTask.dueDate}
              style={{
                borderColor:
                  validate.includes("emptyDueDate") ||
                  validate.includes("futureDueDate")
                    ? "#DC3545"
                    : "#bdbdbd",
              }}
              type="date"
              name="dueDate"
            />
            {validate.includes("emptyDueDate") && (
              <p className="error">Ngày kết thúc không được để trống</p>
            )}
            {validate.includes("futureDueDate") && (
              <p className="error">
                Ngày kết thúc không được trước ngày bắt đầu
              </p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="priority">Độ ưu tiên</label>
            <select
              onChange={handleChange}
              value={inputTask.priority}
              name="priority"
              id=""
              style={{
                borderColor: validate.includes("emptyPriority")
                  ? "#DC3545"
                  : "#bdbdbd",
              }}
            >
              <option value="">Chọn độ ưu tiên</option>
              <option value="Thấp">Thấp</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Cao">Cao</option>
            </select>
            {validate.includes("emptyPriority") && (
              <p className="error">Độ ưu tiên không được để trống</p>
            )}
          </div>
          <div className="relative">
            <label htmlFor="progress">Tiến độ</label>
            <select
              onChange={handleChange}
              value={inputTask.progress}
              name="progress"
              id=""
              style={{
                borderColor: validate.includes("emptyProgress")
                  ? "#DC3545"
                  : "#bdbdbd",
              }}
            >
              <option value="">Chọn tiến độ</option>
              <option value="Đúng tiến độ">Đúng tiến độ</option>
              <option value="Có rủi ro">Có rủi ro</option>
              <option value="Trễ hạn">Trễ hạn</option>
            </select>
            {validate.includes("emptyProgress") && (
              <p className="error">Tiến độ không được để trống</p>
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

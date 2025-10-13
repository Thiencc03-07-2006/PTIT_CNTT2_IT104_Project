import { useEffect, useMemo, useState } from "react";
import "../style/managerment.css";
import ModalAddProject from "../components/ModalAddProject";
import ModalDeleteProject from "../components/ModalDeleteProject";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchProjectData } from "../apis/projectApi";
export default function Management() {
  const [typeEdit, setTypeEdit] = useState<string | boolean>(false);
  const [openDelete, setOpenDelete] = useState<string | boolean>(false);
  const navigate = useNavigate();
  const projects = useSelector((state: RootState) => state.project.projects);
  const nowUser = useSelector((state: RootState) => state.user.nowUser);
  const [filterName, setFilterName] = useState("");
  const fiterProject = useMemo(() => {
    return projects
      .filter((t) =>
        t.members.some(
          (t2) => t2.userId === nowUser && t2.role === "Project owner"
        )
      )
      .filter((t) =>
        t.projectName.toLowerCase().includes(filterName.toLowerCase())
      );
  }, [projects, nowUser, filterName]);
  const [paperMa, setPaperMa] = useState<{
    itemPer: number;
    pageNow: number;
    pageEnd: number;
  }>({ itemPer: 8, pageNow: 1, pageEnd: 1 });
  useEffect(
    () =>
      setPaperMa((prev) => ({
        ...prev,
        pageNow: 1,
        pageEnd: Math.ceil(fiterProject.length / prev.itemPer),
      })),
    [fiterProject]
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProjectData());
  }, [dispatch]);
  return (
    <div className="management">
      <div className="box">
        <div className="mb-[24.2px]">
          <h1 className="title_management">Quản Lý Dự Án Nhóm</h1>
        </div>
        <div className="flex justify-between mb-[15.8px]">
          <button onClick={() => setTypeEdit(true)} className="add_button">
            + Thêm Dự Án
          </button>
          <input
            onChange={(e) => setFilterName(e.target.value)}
            className="management_search"
            type="text"
            placeholder="Tìm kiếm dự án"
          />
        </div>
        <div>
          <h3 className="title_management_table mb-[8px]">Danh Sách Dự Án</h3>
          <table className="w-full mb-[17px]">
            <thead>
              <tr>
                <th className="w-[91px]">ID</th>
                <th className="text-left pl-[11px]">Tên Dự Án</th>
                <th className="w-[227px]">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {fiterProject
                .slice(
                  (paperMa.pageNow - 1) * paperMa.itemPer,
                  paperMa.pageNow * paperMa.itemPer
                )
                .map((t) => (
                  <tr key={t.id}>
                    <td className="pt-[12.2px] pb-[11.8px] text-center">
                      {t.id}
                    </td>
                    <td className="pt-[12px] pb-[12px] pl-[11px] pr-[11px]">
                      {t.projectName}
                    </td>
                    <td className="flex gap-[5px] justify-center pt-[8px] pb-[9px]">
                      <button
                        onClick={() => setTypeEdit(t.id)}
                        className="bg-[#FFC107] text-[#000000]"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => setOpenDelete(t.id)}
                        className="bg-[#DC3545] text-[#FFFFFF]"
                      >
                        Xóa
                      </button>
                      <button
                        onClick={() => navigate(`/detail/${t.id}`)}
                        className="bg-[#0D6EFD] text-[#FFFFFF]"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pages flex justify-center mt-[24px]">
        <div
          onClick={() => {
            if (paperMa.pageNow !== 1)
              setPaperMa((prev) => ({ ...prev, pageNow: prev.pageNow - 1 }));
          }}
          className={paperMa.pageNow === 1 ? "cannot" : ""}
        >
          <ChevronLeft />
        </div>
        {Array.from({ length: paperMa.pageEnd }, (_, i) => i + 1).map((t) => (
          <div
            onClick={() => setPaperMa({ ...paperMa, pageNow: t })}
            key={t}
            className={t === paperMa.pageNow ? "page_now" : ""}
          >
            {t}
          </div>
        ))}
        <div
          onClick={() => {
            if (paperMa.pageNow !== paperMa.pageEnd)
              setPaperMa((prev) => ({ ...prev, pageNow: prev.pageNow + 1 }));
          }}
          className={paperMa.pageNow === paperMa.pageEnd ? "cannot" : ""}
        >
          <ChevronRight />
        </div>
      </div>
      {typeEdit && (
        <ModalAddProject
          setOpen={setTypeEdit}
          typeEdit={typeEdit}
          projects={projects}
        />
      )}
      {openDelete && (
        <ModalDeleteProject open={openDelete} setOpen={setOpenDelete} />
      )}
    </div>
  );
}

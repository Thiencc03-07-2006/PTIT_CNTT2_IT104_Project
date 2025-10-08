import { useState } from "react";
import "../style/managerment.css";
import ModalAddProject from "../components/ModalAddProject";
import ModalDeleteProject from "../components/ModalDeleteProject";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
export default function Management() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();
  const handleDetail = () => {
    navigate(`/detail`);
  };
  const test = [
    { id: "1", projectName: "Xây dựng website thương mại điện tử" },
    { id: "2", projectName: "Xây dựng website thương mại điện tử" },
    { id: "3", projectName: "Xây dựng website thương mại điện tử" },
    { id: "4", projectName: "Xây dựng website thương mại điện tử" },
    { id: "5", projectName: "Xây dựng website thương mại điện tử" },
    { id: "6", projectName: "Xây dựng website thương mại điện tử" },
    { id: "7", projectName: "Xây dựng website thương mại điện tử" },
    { id: "8", projectName: "Xây dựng website thương mại điện tử" },
    { id: "9", projectName: "Xây dựng website thương mại điện tử" },
  ];
  return (
    <div className="management">
      <div className="box">
        <div className="mb-[24.2px]">
          <h1 className="title_management">Quản Lý Dự Án Nhóm</h1>
        </div>
        <div className="flex justify-between mb-[15.8px]">
          <button onClick={() => setOpenAdd(true)} className="add_button">
            + Thêm Dự Án
          </button>
          <input
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
              {test.map((t) => (
                <tr key={t.id}>
                  <td className="pt-[12.2px] pb-[11.8px] text-center">
                    {t.id}
                  </td>
                  <td className="pt-[12px] pb-[12px] pl-[11px] pr-[11px]">
                    {t.projectName}
                  </td>
                  <td className="flex gap-[5px] justify-center pt-[8px] pb-[9px]">
                    <button className="bg-[#FFC107] text-[#000000]">Sửa</button>
                    <button
                      onClick={() => setOpenDelete(true)}
                      className="bg-[#DC3545] text-[#FFFFFF]"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={handleDetail}
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
        <div className="cannot">
          <ChevronLeft />
        </div>
        <div className="page_now">1</div>
        <div>2</div>
        <div>3</div>
        <div>
          <ChevronRight />
        </div>
      </div>
      {openAdd && <ModalAddProject setOpen={setOpenAdd} />}
      {openDelete && <ModalDeleteProject setOpen={setOpenDelete} />}
    </div>
  );
}

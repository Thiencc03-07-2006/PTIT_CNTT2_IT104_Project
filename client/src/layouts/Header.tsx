import "../style/header.css";
import { Link, NavLink } from "react-router-dom";
export default function Header() {
  const isProjectActive =
    location.pathname === "/" || location.pathname.startsWith("/detail");
  return (
    <div className="h-[56px] bg-[#212529] px-[calc(300/1920*100vw)] flex justify-between items-center fixed top-0 left-0 w-full z-[9999]">
      <div>
        <h1 className="title_header">Quản Lý Dự Án</h1>
      </div>
      <nav className="p-[8px] flex gap-[15px]">
        <NavLink
          to="/"
          className={`nav_item ${
            isProjectActive ? "text-[#ffffff]" : "text-[#ffffff8c]"
          }`}
        >
          Dự Án
        </NavLink>
        <NavLink
          to="/my-mission"
          className={({ isActive }) =>
            `nav_item ${isActive ? "text-[#ffffff]" : "text-[#ffffff8c]"}`
          }
        >
          Nhiệm Vụ của tôi
        </NavLink>
        <Link
          onClick={() => localStorage.setItem("nowAcc", "{}")}
          to="/login"
          className="nav_item now_page text-[#ffffff]"
        >
          Đăng Xuất
        </Link>
      </nav>
    </div>
  );
}

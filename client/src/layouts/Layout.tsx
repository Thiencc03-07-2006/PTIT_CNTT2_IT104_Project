import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
export default function Layout() {
  return (
    <div>
      <Header />
      <div className="flex justify-center p-[24px] mt-[56px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

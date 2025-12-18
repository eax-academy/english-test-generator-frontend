import { Outlet } from "react-router-dom";
import SideBar from "../pages/admin/SideBar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <SideBar />

      <main className="flex-1 p-8 text-white">
        <Outlet />
      </main>
    </div>
  );
}

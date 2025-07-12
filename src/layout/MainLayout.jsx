import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout(){
    return(
         <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: "220px", width: "100%", minHeight: "100vh" }}>
        <Outlet />
      </div>
    </div>
    )
}
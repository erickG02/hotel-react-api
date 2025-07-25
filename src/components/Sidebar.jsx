import { Link,useLocation } from "react-router-dom";
import style from '../../src/styles/Sidebar.module.css'
import { FaSignOutAlt, FaHome, FaClipboardList } from "react-icons/fa";
import { NavLink , Outlet, useNavigate, }from "react-router-dom";

export default function Sidebar(){

   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

   const location = useLocation();

  return (
    <aside className={style.sidebar}>
      <div>
        <h2 className={style.title}>Panel de inicio</h2>
        <nav className={style.menu}>
          <Link
            to="/alojamientos"
            className={`${style.link} ${
              location.pathname === "/alojamientos" ? style.active : ""
            }`}
          >
            <FaHome className={style.icon} />
            Alojamiento
          </Link>

          <Link
            to="/reservaciones"
            className={`${style.link} ${
              location.pathname === "/reservaciones" ? style.active : ""
            }`}
          >
            <FaClipboardList className={style.icon} />
            Reservaciones
          </Link>
           <Link
            to="/tablareserva"
            className={`${style.link} ${
              location.pathname === "/tablareserva" ? style.active : ""
            }`}
          >
            <FaClipboardList className={style.icon} />
            Tabla Reservaciones
          </Link>
        </nav>
      </div>

      <div className={style.footer}>
        <button className={style.logout} onClick={handleLogout}>
          <FaSignOutAlt className={style.icon} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
    
}
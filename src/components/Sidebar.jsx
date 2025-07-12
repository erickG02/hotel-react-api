import { Link,useLocation } from "react-router-dom";
import style from '../../src/styles/Sidebar.module.css'
import { FaSignOutAlt, FaHome, FaClipboardList } from "react-icons/fa";

export default function Sidebar(){
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
        </nav>
      </div>

      <div className={style.footer}>
        <button className={style.logout}>
          <FaSignOutAlt className={style.icon} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
    
}
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
    

/*
   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Dashboard
  return (
    <div className={style["app-container"]}>
      <aside className={style.sidebar}>
        <div>
          <div className={style["menu-header"]}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2222/2222971.png"
              alt="panel"
              className={style["menu-icon-large"]}
            />
            <h2 className={style["menu-title"]}>Panel de Control</h2>
          </div>

          <nav className={style["menu-section"]}>
            <NavLink
              to="/alojamientos"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                alt="hotel"
                className={style["menu-icon"]}
              />
              Alojamientos
            </NavLink>

            <NavLink
              to="/reservaciones"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
                alt="calendar"
                className={style["menu-icon"]}
              />
              Reservaciones
            </NavLink>
          </nav>
        </div>

        <button className={style["logout-btn"]} onClick={handleLogout}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
            alt="logout"
            className={style["menu-icon"]}
          />
          Cerrar Sesión
        </button>
      </aside>

      <main className={style["main-content"]}>
        <Outlet />
      </main>
    </div>
  );
  */
}
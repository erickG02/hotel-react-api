import { Link,useLocation } from "react-router-dom";
import style from '../../src/styles/Sidebar.module.css'
import { FaSignOutAlt, FaHome, FaClipboardList } from "react-icons/fa";
import { NavLink, Outlet, useNavigate, }from "react-router-dom";

export default function Sidebar(){
  /*  const location = useLocation();

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
    */


   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Dashboard
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div>
          <div className="menu-header">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2222/2222971.png"
              alt="panel"
              className="menu-icon-large"
            />
            <h2 className="menu-title">Panel de Control</h2>
          </div>

          <nav className="menu-section">
            <NavLink
              to="/alojamientos"
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                alt="hotel"
                className="menu-icon"
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
                className="menu-icon"
              />
              Reservaciones
            </NavLink>
          </nav>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
            alt="logout"
            className="menu-icon"
          />
          Cerrar Sesión
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
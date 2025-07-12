import {
  BrowserRouter,
  Route,
  Routes,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Accommodations/Login";
import ListarAlojamientos from "./components/Accommodations/AccommodationsList";
import "./App.css";

const MainLayout = () => {
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
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route
            path="/alojamientos"
            element={
              <>
                <h1 className="page-title">Alojamientos</h1>
                <ListarAlojamientos />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

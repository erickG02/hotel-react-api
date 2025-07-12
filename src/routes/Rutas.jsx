import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCalendar from "../components/reservations/MyCalendar";
import MainLayout from "../layout/MainLayout";
import Login from "../components/accommodations/Login";
import styles from '../styles/accommodations/accommodationsList.module.css';
import   ListarAlojamientos from "../components/accommodations/AccommodationsList";
export default function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route element={<MainLayout />}>
          <Route
                path="/alojamientos"
                element={
                <>
                    <h1 className={styles["page-title"]}>Alojamientos</h1>
                    <ListarAlojamientos />
                </>
                        }
            />
                 <Route path="/reservaciones" element={<MyCalendar/>}/>
                 </Route>
            </Routes>
        </Router>
    );
}
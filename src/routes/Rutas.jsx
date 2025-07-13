import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCalendar from "../components/reservations/MyCalendar";
import MainLayout from "../layout/MainLayout";
import Login from "../components/accommodations/Login";
import styles from '../styles/accommodations/accommodationsList.module.css';
import   ListarAlojamientos from "../components/accommodations/AccommodationsList";
import AccommodatonsForm from "../components/accommodations/AccommodationsForm";
import BookingsList from "../components/reservations/BookingsList";

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

                    <ListarAlojamientos />
                </>
                        }
            />
                 <Route path="/reservaciones" element={<MyCalendar/>}/>
                     <Route path="/accommodations/create" element={<AccommodatonsForm />} />
                         <Route path="/tablareserva" element={<BookingsList />} />
                 </Route>
            </Routes>
        </Router>
    );
}
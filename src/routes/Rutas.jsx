import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCalendar from "../components/reservations/MyCalendar";
import MainLayout from "../layout/MainLayout";
import BookingsList from "../components/reservations/BookingsList";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    {/*<Route path="/Alojamientos"  element={<Alojamientos/>}/>*/}
                    <Route path="/reservaciones" element={<MyCalendar />} />
                    <Route path="/tablareserva" element={<BookingsList />} />

                </Route>
            </Routes>
        </Router>
    );
}
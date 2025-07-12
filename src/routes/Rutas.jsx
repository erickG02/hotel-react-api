import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCalendar from "../components/reservations/MyCalendar";
import MainLayout from "../layout/MainLayout";

export default function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                {/*<Route path="/Alojamientos"  element={<Alojamientos/>}/>*/}
                 <Route path="/reservaciones" element={<MyCalendar/>}/>
                 </Route>
            </Routes>
        </Router>
    );
}
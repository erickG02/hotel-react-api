import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCalendar from "../components/reservations/MyCalendar";

export default function AppRoutes(){
    return (
        <Router>
            <Routes>
                <Route path="/calendar" element={<MyCalendar/>}/>
            </Routes>
        </Router>
    );
}
import axios from "axios";
export const getAllCalendarBookings = async () => {
  const API_BASE = "https://apibookingsaccomodations-production.up.railway.app/api/V1";
  const token = sessionStorage.getItem("nubix_token");
  const headers = { Authorization: `Bearer ${token}` };

  const [bookingsRes, accommodationsRes, usersRes] = await Promise.all([
    axios.get(`${API_BASE}/bookings`, { headers }),
    axios.get(`${API_BASE}/accomodations`, { headers }),
    axios.get(`${API_BASE}/users`, { headers })
  ]);

  const bookings = bookingsRes.data;
  const accommodations = accommodationsRes.data;
  const users = usersRes.data;

  return bookings.map((b) => {
    const user = users.find(u => u.id === b.user_id);
    const accommodation = accommodations.find(a => a.id === b.accomodation_id);
    return {
      id: b.id,
      title: `${user?.name ?? "Invitado"} - ${accommodation?.name ?? "Alojamiento"}`,
      start: b.check_in_date,
      end: b.check_out_date,
      backgroundColor: b.status === "CONFIRMED" ? "#4caf50"
                      : b.status === "CANCELLED" ? "#f44336"
                      : "#ff9800",
      borderColor: "#000"
    };
  });
};

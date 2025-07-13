import axios from "axios";
export const getAllCalendarBookings = async () => {
  const API_BASE = "https://apibookingsaccomodations-production.up.railway.app/api/V1";
  const token = "1504|kxR8XgDOm2xiutUgJ85RuF4JIRLgouUJ5QCJJKgi4b2c29c3";
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

export const getAllReservations = async () => {
  const API_BASE = "https://apibookingsaccomodations-production.up.railway.app/api/V1";
  const token = "1504|kxR8XgDOm2xiutUgJ85RuF4JIRLgouUJ5QCJJKgi4b2c29c3";
  const headers = { Authorization: `Bearer ${token}` };

  const { data: bookings } = await axios.get(`${API_BASE}/bookings`, { headers });

  return bookings;
};

export const updateBookingStatus = async (id, status) => {
  const API_BASE = "https://apibookingsaccomodations-production.up.railway.app/api/V1";
  const token = "1504|kxR8XgDOm2xiutUgJ85RuF4JIRLgouUJ5QCJJKgi4b2c29c3";
  const headers = { Authorization: `Bearer ${token}` };

  const { data: updatedBooking } = await axios.patch(
    `${API_BASE}/status_booking/${id}`,
    { status },
    { headers }
  );
  return updatedBooking;
};

export const createReservation = async (reservationData) => {
  const API_BASE = "https://apibookingsaccomodations-production.up.railway.app/api/V1";
  const token = "1504|kxR8XgDOm2xiutUgJ85RuF4JIRLgouUJ5QCJJKgi4b2c29c3";
  const headers = { Authorization: `Bearer ${token}` };

  const { data: newBooking } = await axios.post(
    `${API_BASE}/booking`,   
    reservationData,
    { headers }
  );
  return newBooking;
};

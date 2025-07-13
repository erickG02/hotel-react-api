import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/reservations/reservations.module.css";
import { createReservation, getAllReservations, updateBookingStatus } from "../../service/bookingsService copy";
import Swal from 'sweetalert2';
export default function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [accommodations, setAccommodations] = useState([]);

  const [form, setForm] = useState({
    booking: "",
    user_id: "",
    accomodation_id: "",
    check_in_date: "",
    check_out_date: "",
    total_amount: "",
  });

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllReservations();
      setBookings(data);
    } catch (e) {
      setError("Error al cargar las reservaciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (!modalOpen) return;

    const fetchOptions = async () => {
      try {
        const API_BASE =
          "https://apibookingsaccomodations-production.up.railway.app/api/V1";
        const token =
          "1504|kxR8XgDOm2xiutUgJ85RuF4JIRLgouUJ5QCJJKgi4b2c29c3";
        const headers = { Authorization: `Bearer ${token}` };

        const [usersRes, accRes] = await Promise.all([
          axios.get(`${API_BASE}/users`, { headers }),
          axios.get(`${API_BASE}/accomodations`, { headers }),
        ]);

        setUsers(usersRes.data);
        setAccommodations(accRes.data);
      } catch (err) {
          Swal.fire({
              icon: "error",
              title: "Error al cargar las opciones del formulario",
              text: "Verifica los datos e intenta nuevamente.",
              confirmButtonColor: "#e62525"
            });
      }
    };

    fetchOptions();
  }, [modalOpen]);

  const toggleStatus = async (id, currentStatus) => {
    if (updatingId) return;

    const newStatus = currentStatus === "CONFIRMED" ? "CANCELLED" : "CONFIRMED";
    setUpdatingId(id);

    try {
      await updateBookingStatus(id, newStatus);
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (e) {
        Swal.fire({
              icon: "error",
              title: "Error no se puede actualizar",
              text: "Verifica los datos e intenta nuevamente.",
              confirmButtonColor: "#e62525"
            });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      booking: "",
      user_id: "",
      accomodation_id: "",
      check_in_date: "",
      check_out_date: "",
      total_amount: "",
    });
  };

  const handleCreateReservation = async (e) => {
    e.preventDefault();

    try {
     
      await createReservation({
        booking: form.booking,
        check_in_date: form.check_in_date,
        check_out_date: form.check_out_date,
        total_amount: Number(form.total_amount),
        accomodation_id: Number(form.accomodation_id),
        user_id: Number(form.user_id),
      });
       Swal.fire({
              icon: "success",
              title: "¡Reservación creada con exito!",
              text: "La reservación fue creada correctamente.",
              confirmButtonColor: "#1e293b"
            });
      setModalOpen(false);
      resetForm();
      fetchBookings();
    } catch (err) {
       Swal.fire({
              icon: "error",
              title: "Error al guardar",
              text: "Verifica los datos e intenta nuevamente.",
              confirmButtonColor: "#e62525"
            });
    }
  };

  return (
    <div className={styles.bookingsList}>
      <h2>Lista de Reservaciones</h2>
      <button onClick={() => setModalOpen(true)} className={styles.createBtn}>
        Nueva Reservación
      </button>

      {loading && <p>Cargando reservaciones...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <ul>
        {bookings.map(
          ({
            id,
            user,
            accomodation,
            check_in_date,
            check_out_date,
            total_amount,
            status,
          }) => (
            <li key={id} className={styles.bookingItem}>
              <strong>{user}</strong> – {accomodation}
              <br />
              Check‑in: {check_in_date} — Check‑out: {check_out_date}
              <br />
              Monto total: ${total_amount} — Estado:{" "}
              <span
                style={{
                  color:
                    status === "CONFIRMED"
                      ? "green"
                      : status === "CANCELLED"
                      ? "red"
                      : "orange",
                  fontWeight: "bold",
                }}
              >
                {status}
              </span>
              <br />
              <button
                onClick={() => toggleStatus(id, status)}
                disabled={updatingId === id}
                style={{
                  marginTop: "8px",
                  padding: "6px 12px",
                  cursor: updatingId === id ? "not-allowed" : "pointer",
                }}
              >
                {status === "CONFIRMED" ? "Cancelar" : "Confirmar"}
              </button>
            </li>
          )
        )}
      </ul>

      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Crear Reservación</h2>
            <form onSubmit={handleCreateReservation} className={styles.form}>
              <label>
                Código de reserva:
                <input
                  name="booking"
                  type="text"
                  value={form.booking}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                Usuario:
                <select
                  name="user_id"
                  value={form.user_id}
                  onChange={handleFormChange}
                  required
                >
                  <option value=""> Selecciona un usuario </option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Alojamiento:
                <select
                  name="accomodation_id"
                  value={form.accomodation_id}
                  onChange={handleFormChange}
                  required
                >
                  <option value=""> Selecciona un alojamiento </option>
                  {accommodations.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Check‑in:
                <input
                  name="check_in_date"
                  type="date"
                  value={form.check_in_date}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                Check‑out:
                <input
                  name="check_out_date"
                  type="date"
                  value={form.check_out_date}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <label>
                Monto total:
                <input
                  name="total_amount"
                  type="number"
                  min="0"
                  value={form.total_amount}
                  onChange={handleFormChange}
                  required
                />
              </label>

              <div className={styles.modalButtons}>
                 <button  className={styles.btnCancelar}  type="button" onClick={() => setModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit">Crear</button>
               
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

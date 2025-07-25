import { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getAllCalendarBookings} from "../../service/bookingsService";
import styles from '../../styles/reservations/MyCalendar.module.css';

export default function MyCalendar () {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getAllCalendarBookings();
        setEvents(data);
      } catch (err) {
           Swal.fire({
              icon: "error",
              title: "Error al cargar los datos",
              text: "Verifica los datos e intenta nuevamente.",
              confirmButtonColor: "#e62525"
            });
      }
    };
    loadEvents();
  }, []);

  return (
    <div className={styles.fullscreenCalendar}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={false}
        selectable={false}
        height="100%"
        events={events}
        eventClick={(info) => {
          alert(`Reserva: ${info.event.title}\nFecha: ${info.event.startStr}`);
        }}
      />
    </div>
  )
}

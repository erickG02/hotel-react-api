// ListarAlojamientos.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/accommodations/accommodationsList.module.css";
import AccommodationsForm from "./AccommodationsForm";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";

export default function ListarAlojamientos() {
  const [alojamientos, setAlojamientos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    fetchAlojamientos();
  }, []);

  const fetchAlojamientos = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAlojamientos(response.data);
    } catch (error) {
         Swal.fire({
              icon: "error",
              title: "Error al obtener los alojamientos",
              text: "Verifica los datos e intenta nuevamente.",
              confirmButtonColor: "#e62525"
            });
    }
  };

  const handleSave = async (data) => {
    const token = sessionStorage.getItem("token");
    try {
      if (editingData) {
        await axios.put(
          `https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/${editingData.id}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire("Actualizado", "Alojamiento actualizado exitosamente", "success");
      } else {
        await axios.post(
          "https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation",
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire("Guardado", "Alojamiento creado exitosamente", "success");
      }

      setShowModal(false);
      setEditingData(null);
      fetchAlojamientos();
    } catch (error) {
      Swal.fire("Error", "Ocurrió un error al guardar.", "error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles["page-title"]}>Alojamientos</h1>
        <button onClick={() => setShowModal(true)} className={styles.newButton}>Nuevo Alojamiento</button>
      </div>

      <div className={styles.grid}>
        {alojamientos.map((a) => (
          <div key={a.id} className={styles.card}>
            <img src={a.image} alt={a.name} className={styles.image} />
            <h4>{a.name}</h4>
            <p><strong>Dirección:</strong> {a.address}</p>
            <p><strong>Descripción:</strong> {a.description}</p>
            <div className={styles.cardActions}>
              <FaEdit
                className={styles.icon}
                onClick={() => {
                  setEditingData(a);
                  setShowModal(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <AccommodationsForm
          onClose={() => {
            setShowModal(false);
            setEditingData(null);
          }}
          onSubmit={handleSave}
          defaultValues={editingData}
        />
      )}
    </div>
  );
}

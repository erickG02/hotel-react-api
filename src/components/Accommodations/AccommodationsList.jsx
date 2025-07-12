import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/accommodations/accommodationsList.module.css";

export default function ListarAlojamientos() {
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    axios
      .get(
        "https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setAlojamientos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener alojamientos", error);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {alojamientos.map((alojamiento) => (
          <div key={alojamiento.id} className={styles.card}>
            <img
              src={alojamiento.image}
              alt={alojamiento.name}
              className={styles.image}
            />
            <h4>{alojamiento.name}</h4>
            <p>
              <strong>Dirección:</strong> {alojamiento.address}
            </p>
            <p>
              <strong>Descripción:</strong> {alojamiento.description}
            </p>
          </div>
        ))}
      </div>   
    </div>
  );
}

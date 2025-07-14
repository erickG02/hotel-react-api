import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import styles from '../../styles/accommodations/accommodationsForm.module.css';

export default function AccommodationsForm({ onClose, onSubmit, defaultValues }) {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    } else {
      reset(); // limpia si es nuevo
    }
  }, [defaultValues, reset]);

  const submit = async (data) => {
    try {
      setLoading(true);
      await onSubmit(data);

      await Swal.fire({
        icon: "success",
        title: defaultValues ? "¡Alojamiento actualizado!" : "¡Registro exitoso!",
        text: defaultValues
          ? "El alojamiento fue actualizado correctamente."
          : "El alojamiento fue guardado correctamente.",
        confirmButtonColor: "#1e293b"
      });

      onClose();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: "Verifica los datos e intenta nuevamente.",
        confirmButtonColor: "#e62525"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{defaultValues ? "Editar Alojamiento" : "Nuevo Alojamiento"}</h2>
          <button onClick={onClose} className={styles.closeBtn}>×</button>
        </div>
        <form onSubmit={handleSubmit(submit)} className={styles.form}>
          <label className={styles["text-name"]}>Nombre *</label>
          <input
            type="text"
            {...register('name', { required: true })}
            placeholder="Nombre del alojamiento"
          />

          <label className={styles["text-direccion"]}>Dirección *</label>
          <input
            type="text"
            {...register('address', { required: true })}
            placeholder="Dirección del alojamiento"
          />

          <label className={styles["text-description"]}>Descripción</label>
          <textarea
            {...register('description')}
            placeholder="Descripción del alojamiento"
          />

          <div className={styles.buttonGroup}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancelar</button>
            <button type="submit" className={styles.saveBtn} disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



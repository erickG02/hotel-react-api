import React from 'react'
import { creatAccommodations } from '../../services/apiServices'
import { useForm } from 'react-hook-form'

export default function AccommodatonsForm() {
  const { register, handleSubmit, reset } = useForm()

  const saveAccomodations = async(data) => {
    const response = creatAccommodations(data)
    alert(`Registro Existoso`)
    reset()
  }
  
  return (
      <section>
      <h1>Edite su Alojamiento:</h1>
      <form onSubmit={handleSubmit(saveAccomodations)}>
        <div>
          <label>Nombre:</label>
          <input type='text'{...register("name", {required:true} )}/>
        </div>
        <div>
          <label>Descripcion:</label>
          <input type='text' {...register("description", {required:true})}/>
        </div>
        <div>
          <label>Direccion:</label>
          <input type='text' {...register("address", {required:true})}/>
        </div>
        <div>
          <input type="submit" value='Guardar Datos' />
        </div>
      </form>
    </section>
  )
}

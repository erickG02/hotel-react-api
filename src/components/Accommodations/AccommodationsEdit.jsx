import React, { useEffect } from 'react'
import { getAccommodationsById, updateAccommodations } from '../../services/apiServices'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'


export default function AccommodationsEdit() {
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()
  const { accommodationId } = useParams()
  
  const saveAccomodations = async (data) => {
    try{
      const response = await updateAccommodations(data, accommodationId);
      alert("Actualizacion Exitosa")
      navigate('/accomodations')
    }catch(error){
      alert(`Error al actualizar la publicacion`, error)
    }
    
  }

  useEffect(()=>{
    const fetchPostId = async () => {
      const response = await getAccommodationsById(accommodationId)
      console.log(response)
      reset(response)
    }
    fetchPostId()
  }, [accommodationId, reset])

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

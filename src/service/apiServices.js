import axios from "axios";

//sessionStorage.getItem(token)

const token = "1389|H0kBxJMf0n54UVBGpQolPDvW1Ft8mIlQ7DYguTKP99be41d5"

const creatAccommodations = async(accomodation_data) => {
    try{
        const response = await axios.post(`https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation`, accomodation_data, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    }catch(error){
        alert(`No se pudo agendar el alojamiento`, error)
    }

}

const getAccomodations = async() => {
    try{
        const response = await axios.get(`https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        return response
    }catch(error){
        alert("No se pudo recoger la informacion"), error
    }
}

const getAccommodationsById = async(id_accomodation) => {
    try{
        const response = await axios.get(`https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/${id_accomodation}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        return response
    }catch(error){
        alert("No se pudo conseguir la informacion",error)
    }
}


const updateAccommodations = async (accomodation_data, id_accomodation) => {
    try{
        const response = await axios.put(`https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/${id_accomodation}`, accomodation_data ,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }catch(error){
        alert(`No se ha logrado actualizar el alojamiento`, error)
    }
}

export { updateAccommodations, getAccommodationsById, creatAccommodations, getAccomodations }
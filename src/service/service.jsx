import axios from "axios";

sessionStorage.getItem(token)

const token = sessionStorage.getItem('token');
const headers = {
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json",
            };

const createAccommodations = async(accomodation_data) => {
    try{
        const response = await axios.post('https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation, accomodation_data',{headers})
        return response
    }catch(error){
        alert('No se pudo agendar el alojamiento', error)
    }

}

const getAccomodations = async() => {
    try{
        const response = await axios.get('https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodations',{headers});
        return response.data
    }catch(error){
        alert("No se pudo recoger la informacion"), error
    }
}

const getAccommodationsById = async(id_accomodation) => {
    try{
        const response = await axios.get('https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation/${id_accomodation}',{headers});
        return response
    }catch(error){
        alert("No se pudo conseguir la informacion",error)
    }
}


const updateAccommodations = async (accomodation_data, id_accomodation) => {
    try{
        const response = await axios.put('https://apibookingsaccomodations-production.up.railway.app/api/V1/accomodation${id_accomodation}, accomodation_data',{headers});
        //console.log(response)
        return response;
    }catch(error){
        alert('No se ha logrado actualizar el alojamiento', error)
    }
}

export { updateAccommodations, getAccommodationsById, createAccommodations, getAccomodations }
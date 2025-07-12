import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getAccomodations } from '../../services/apiServices';

export default function AccommodationsList() {
  const [accomodations, setAccomodations] = useState([]);
  const { accommodationId } = useParams();

    const fecthData = async () => {
        const data = await getAccomodations();
        console.log(data)
        setAccomodations(data.data);
    }

    useEffect(() => {
        fecthData()
    }, [accommodationId])

    return (
    <section>
        {
            accomodations.map((item) =>{
                return(
                    <div key={item.id}>
                        <h1>{item.name}</h1>
                        <p>{item.description}</p>
                        <p>{item.address}</p>
                        <Link to={`/edit/${item.id}`}>Editar</Link>
                    </div>
            )
            })

        }
    </section>
  )
}

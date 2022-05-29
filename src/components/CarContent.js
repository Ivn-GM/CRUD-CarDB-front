import { Table } from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server_url } from '../serverurl';
import AddCar from './AddCar';
import EditCar from './EditCar';

export const CarContent = () => {

    const [data, setData] = useState([{
        Marca: "",
        Modelo: "",
        Color: "",
        Precio: 0,
        NúmeroRegistro: 0,
        Año: 0
    }])

    useEffect(() => {
        getCarData();        
    }, []);

    const getCarData = async() => {
        try {
            const response = await axios.get(server_url);
            setData(response.data._embedded.cars);
        } catch (err) {
            console.log(err.message);
        }
    }

    
    const deleteCarData = async(theCar) => {
        try {
            await axios.delete(theCar); 
            setData(data.filter((car) => car._links.car.href !== theCar));          
        } catch(err) {
            console.log(err.message);
        }
    }

        
    const cars = data.map((car, index) => (
        <tr key={index}>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.color}</td>
            <td>{car.registerNumber}</td>
            <td>{car.year}</td>
            <td>{car.price}</td>
            <EditCar car={car}/>
            <p 
                style={{ color: "red", fontWeight: "bold", cursor: "pointer", paddingLeft: "2rem"}} 
                onClick={() => deleteCarData(car._links.car.href)} >
                    X
            </p>            
        </tr>
    ))
    
  return (
    <div>
        <AddCar />
        <br/>
        <Table horizontalSpacing="xl" verticalSpacing="xs">
            <thead>
                <tr>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Color</th>
                    <th>Número de registro</th>
                    <th>Año</th>
                    <th>Precio (€)</th>
                </tr>
            </thead>
            <tbody>
                {cars}
            </tbody>
        </Table>
    </div>
  )
}

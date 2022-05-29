import { Button, Dialog, Group, TextInput } from '@mantine/core';
import axios from 'axios';
import React, { useState } from 'react';

const EditCar = ({ car }) => {
    const [opened, setOpened] = useState(false);
    const [newCar, setNewCar] = useState({
        brand: car.brand,
        model: car.model,
        color: car.color,
        registerNumber: car.registerNumber,
        year: car.year,
        price: car.price
    })

    const onChange = (e) => {
        setNewCar({
          ...newCar,
          [e.target.name]: e.target.value.trim()
        })
      }

      const editingCar = async(data) => {
        try {
          await axios.patch(car._links.car.href, data);
          window.location.reload();
        } catch(err) {
          console.log(err.message);
        }    
      }

  return (
    <>
        <Group 
            position='left'
            style={{ marginTop: 10 }} 
        >
          <Button onClick={() => setOpened((o) => !o)}>Editar</Button>
        </Group>
  
        <Dialog
            position={{ align: "center", left: "40vw", top: "20vw" }}            
            opened={opened}
            withCloseButton
            onClose={() => setOpened(false)}
            size="lg"
            radius="md"
            
        >
          
          <Group  style={{ justifyContent: "center", display: "grid" }}>
            <TextInput defaultValue={car.brand} onChange={onChange} name="brand" />
            <TextInput defaultValue={car.model} onChange={onChange} name="model" />
            <TextInput defaultValue={car.color} onChange={onChange} name="color" />
            <TextInput defaultValue={car.registerNumber} onChange={onChange} name="registerNumber" />
            <TextInput defaultValue={car.year} onChange={onChange} name="year" />
            <TextInput defaultValue={car.price} onChange={onChange} name="price" />
            <br/>
            <Button type="submit" onClick={() => editingCar(newCar)} >Añadir</Button>
          </Group>
        </Dialog>
    </>
  )
}

export default EditCar;
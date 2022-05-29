import { Button, Dialog, Group, TextInput } from '@mantine/core';
import axios from 'axios';
import React, { useState } from 'react';
import { server_url } from '../serverurl';

const AddCar = () => {
    const [opened, setOpened] = useState(false);
    const [newCar, setNewCar] = useState({
      brand: "",
      model: "",
      color: "",
      registerNumber: "",
      year: 0,
      price: 0
  })

  const onChange = (e) => {
    setNewCar({
      ...newCar,
      [e.target.name]: e.target.value.trim()
    })
  }

  const addingCar = async(data) => {
    try {
      await axios.post(server_url, data);
      window.location.reload();
    } catch(err) {
      console.log(err.message);
    }    
  }

    return (
      <>
        <Group position="center">
          <Button onClick={() => setOpened((o) => !o)}>Añadir coche</Button>
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
            <TextInput placeholder="Marca" onChange={onChange} name="brand" />
            <TextInput placeholder="Modelo" onChange={onChange} name="model" />
            <TextInput placeholder="Color" onChange={onChange} name="color" />
            <TextInput placeholder="Nº Registro" onChange={onChange} name="registerNumber" />
            <TextInput placeholder="Año" onChange={onChange} name="year" />
            <TextInput placeholder="Precio" onChange={onChange} name="price" />
            <br/>
            <Button type="submit" onClick={(() => addingCar(newCar))} >Añadir</Button>
          </Group>
        </Dialog>
      </>
    );
}

export default AddCar;
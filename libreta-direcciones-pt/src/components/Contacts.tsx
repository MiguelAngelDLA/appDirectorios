import { useState, useEffect } from "react";
import { Box, Typography, Button, Modal, TextField, Stack, Select, MenuItem, IconButton, Snackbar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { SelectChangeEvent } from "@mui/material/Select";

import axios from "axios";

interface ServerResponse {
  Contactos: ServerData[]; // Modify the interface to match the new response structure
}

interface ServerData {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  calle: string;
  estado: string;
  empresa: string;
  cargo: string;
  notas: string;
  cumpleaños: string;
}

export const ShowContactsPage = () => {
  const [data, setData] = useState<ServerData[]>([]);
  const [selectedContact, setSelectedContact] = useState<ServerData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isEraseModalOpen, setIsEraseModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [mensajeSnackbar, setSnackbarMessage] = useState("");

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    axios.get<ServerResponse>("http://localhost:5000/api/contacts")
      .then(response => {
        console.log(response.data); 
        console.log(response.data.Contactos)
        setData(response.data.Contactos);
      })
      .catch(error => {
        console.error("Error obteniendo los contactos:", error);
      });
  };

  const handleSaveContact = () => {
    axios.patch(`http://localhost:5000/api/contacts/${selectedContact?.id}`, selectedContact)
      .then(response => {
        console.log("Contacto actualizado exitosamente:", response.data);
        handleModalClose();
        getInfo();
      })
      .catch(error => {
        console.error("Error al actualizar el contacto:", error);
      });
  };

  const handleDeleteContact = () => {
    axios.delete(`http://localhost:5000/api/contacts/${selectedContact?.id}`)
      .then(response => {
        console.log("Contacto eliminado exitosamente:", response.data);
        handleModalClose();
        getInfo();
      })
      .catch(error => {
        console.error("Error al eliminar el contacto:", error);
      });
  };

  const handleContactClick = (contact: ServerData) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleModificarClick = () =>{
    setIsModifyModalOpen(true);
  }
  
  const handleDeleteClick = () =>{
    setIsEraseModalOpen(true);
  }

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedContact(prevState => ({
      ...(prevState as ServerData), 
      [name]: value
    }));
  };

  const handleSaveToLocalStorage = (contactoActual: ServerData) => {
    setSelectedContact(contactoActual);
    if (contactoActual) {
        if(localStorage.getItem(contactoActual.id)){
          localStorage.removeItem(contactoActual.id)
          setSnackbarMessage(contactoActual.nombre + " eliminado de favoritos con exito");
          setSnackbarOpen(true);
        }else{
          localStorage.setItem(contactoActual.id, JSON.stringify(contactoActual));
          setSnackbarMessage('!'+ contactoActual.nombre + ' guardado en favoritos!');
          setSnackbarOpen(true);
        }
          
    }
        
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsModifyModalOpen(false);
    setIsEraseModalOpen(false);
  };


  return (
    <div style={{height: "1080px", width: "1920px"}}>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
      <Snackbar
              open={snackbarOpen}
             autoHideDuration={6000}
              onClose={() => setSnackbarOpen(false)}
              message={mensajeSnackbar}
      />
        {data && data.map(contact => (
          <Box
            key={contact.id}
            border={1}
            borderRadius={7}
            p={3}
            m={2}
            onClick={() => handleContactClick(contact)}
            sx={{ cursor: 'pointer' }}
          >
            <IconButton aria-label="guardar a favoritos" size="small"
            onClick={
              () =>handleSaveToLocalStorage(contact)
            }>
            <StarIcon
              sx={{
                top: 10,
                right: 10,
                cursor: 'pointer',
                color: localStorage.getItem(contact.id) ? 'yellow' : 'black',
              }}     
              
            />
            </IconButton>     
            <Typography variant="h6">{`${contact.nombre} ${contact.apellido}`}</Typography>
            <Typography>{`Teléfono: ${contact.telefono}`}</Typography>
            
          </Box>
        ))}
      </Box>
      <Modal open={isModalOpen} onClose={handleModalClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box sx={{
            width: 600,
            bgcolor: 'white',
            borderRadius: 4,
            boxShadow: 24,
            p: 4
          }}>
            <Stack spacing={2} width={600} >
            <Typography variant="h6">Editar Contacto</Typography>
            <Typography>{`Nombre: ${selectedContact?.nombre} ${selectedContact?.apellido}`}</Typography>
            <Typography>{`Teléfono: ${selectedContact?.telefono}`}</Typography>
            <Typography>{`Correo Electrónico: ${selectedContact?.email}`}</Typography>
            <Typography>{`Calle: ${selectedContact?.calle}`}</Typography>
            <Typography>{`Estado: ${selectedContact?.estado}`}</Typography>
            <Typography>{`Empresa: ${selectedContact?.empresa}`}</Typography>
            <Typography>{`Cargo: ${selectedContact?.cargo}`}</Typography>
            <Typography>{`Notas: ${selectedContact?.notas}`}</Typography>
            <Typography>{`Fecha de Cumpleaños: ${selectedContact?.cumpleaños}`}</Typography>

            <Button variant="contained" onClick={handleModificarClick} >Modificar</Button>
            <Button variant="contained" color="error" onClick={handleDeleteClick}>Borrar Contacto</Button>
            <Button onClick={handleModalClose}>Cerrar</Button>


            </Stack>
          </Box>

        </Modal>

      <Modal open={isModifyModalOpen} onClose={handleModalClose}
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
        <Box 
        sx={{
            width: 600,
            bgcolor: 'white',
            borderRadius: 4,
            boxShadow: 24,
            p: 4
          }}>
          <Stack spacing={2} width={600} >

          <Typography variant="h6">Editar Contacto</Typography>
          <TextField
            label="Nombre"
            name="nombre"
            value={selectedContact?.nombre || ""}
            onChange={handleFieldChange}
          />
          <TextField
            label="Apellido"
            name="apellido"
            value={selectedContact?.apellido || ""}
            onChange={handleFieldChange}
          />
          <TextField
            label="Telefono"
            name="telefono"
            value={selectedContact?.telefono || ""}
            onChange={handleFieldChange}
          />
          <TextField
            label="Correo Electronico"
            name="email"
            value={selectedContact?.email || ""}
            onChange={handleFieldChange}
          />
          <TextField
            label="Calle"
            name="calle"
            value={selectedContact?.calle || ""}
            onChange={handleFieldChange}
          />
            <Select
                name="estado"
                label="Estado"
                value={selectedContact?.estado || ""}
                onChange={(e: SelectChangeEvent<string>) => handleFieldChange(e)}
                >           
              <MenuItem value="no">Seleccione uno...</MenuItem>
              <MenuItem value="Aguascalientes">Aguascalientes</MenuItem>
              <MenuItem value="Baja California">Baja California</MenuItem>
              <MenuItem value="Baja California Sur">Baja California Sur</MenuItem>
              <MenuItem value="Campeche">Campeche</MenuItem>
              <MenuItem value="Chiapas">Chiapas</MenuItem>
              <MenuItem value="Chihuahua">Chihuahua</MenuItem>
              <MenuItem value="CDMX">Ciudad de México</MenuItem>
              <MenuItem value="Coahuila">Coahuila</MenuItem>
              <MenuItem value="Colima">Colima</MenuItem>
              <MenuItem value="Durango">Durango</MenuItem>
              <MenuItem value="Estado de México">Estado de México</MenuItem>
              <MenuItem value="Guanajuato">Guanajuato</MenuItem>
              <MenuItem value="Guerrero">Guerrero</MenuItem>
              <MenuItem value="Hidalgo">Hidalgo</MenuItem>
              <MenuItem value="Jalisco">Jalisco</MenuItem>
              <MenuItem value="Michoacán">Michoacán</MenuItem>
              <MenuItem value="Morelos">Morelos</MenuItem>
              <MenuItem value="Nayarit">Nayarit</MenuItem>
              <MenuItem value="Nuevo León">Nuevo León</MenuItem>
              <MenuItem value="Oaxaca">Oaxaca</MenuItem>
              <MenuItem value="Puebla">Puebla</MenuItem>
              <MenuItem value="Querétaro">Querétaro</MenuItem>
              <MenuItem value="Quintana Roo">Quintana Roo</MenuItem>
              <MenuItem value="San Luis Potosí">San Luis Potosí</MenuItem>
              <MenuItem value="Sinaloa">Sinaloa</MenuItem>
              <MenuItem value="Sonora">Sonora</MenuItem>
              <MenuItem value="Tabasco">Tabasco</MenuItem>
              <MenuItem value="Tamaulipas">Tamaulipas</MenuItem>
              <MenuItem value="Tlaxcala">Tlaxcala</MenuItem>
              <MenuItem value="Veracruz">Veracruz</MenuItem>
              <MenuItem value="Yucatán">Yucatán</MenuItem>
              <MenuItem value="Zacatecas">Zacatecas</MenuItem>

            </Select>
          <TextField
            label="Empresa"
            name="empresa"
            value={selectedContact?.empresa || ""}
            onChange={handleFieldChange}
          />
          <TextField
            label="Cargo"
            name="cargo"
            value={selectedContact?.cargo || ""}
            onChange={handleFieldChange}
          />
          <TextField
            label="Notas"
            name="notas"
            value={selectedContact?.notas || ""}
            onChange={handleFieldChange}
          />
          <TextField
            label="Cumpleaños"
            type="date"
            name="cumpleaños"
            value={selectedContact?.cumpleaños || ""}
            onChange={handleFieldChange}
          />
          </Stack>
          <Button variant="contained" onClick={handleSaveContact} >Guardar</Button>
          <Button onClick={handleModalClose}>Cerrar</Button>
        </Box>
      </Modal>
      <Modal open={isEraseModalOpen} onClose={handleModalClose}
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
            <Box
            sx={{
                width: 600,
                bgcolor: 'white',
                borderRadius: 4,
                boxShadow: 24,
                p: 4
              }}
              
              >
                <Typography variant="h6" color={"red"}>¿Está seguro de querer eliminar este contacto?</Typography>
                <Button variant="contained" color="error" onClick={handleDeleteContact}>Si, estoy seguro</Button>
                <Button onClick={handleModalClose}>No, no quiero borrarlo</Button>
              </Box>
        </Modal>
    </div>
  );

};

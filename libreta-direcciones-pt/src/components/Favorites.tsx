import { useState, useEffect } from "react";
import { Box, Typography, Button, Modal, Stack, IconButton, Snackbar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

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

export const FavoritesPage = () => {
  const [data, setData] = useState<ServerData[]>([]);
  const [selectedContact, setSelectedContact] = useState<ServerData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [mensajeSnackbar, setSnackbarMessage] = useState("");

  useEffect(() => {
    const contactsFromLocalStorage = Object.values(localStorage).map(contact => JSON.parse(contact));
    setData(contactsFromLocalStorage);
  }, []);

  const handleContactClick = (contact: ServerData) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleSaveToLocalStorage = (contactoActual: ServerData) => {
    setSelectedContact(contactoActual);
    if (contactoActual) {
      if(localStorage.getItem(contactoActual.id)){
        localStorage.removeItem(contactoActual.id)
        setSnackbarMessage(contactoActual.nombre + " eliminado de favoritos con exito");
        setSnackbarOpen(true);
        setData(prevData => prevData.filter(contact => contact.id !== contactoActual.id));
        setSelectedContact(null); // Clear the selected contact
    
      } else {
        localStorage.setItem(contactoActual.id, JSON.stringify(contactoActual));
        setSnackbarMessage(contactoActual.nombre + ' guardado en favoritos!');
        setSnackbarOpen(true);
      }
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{height: "1080px", width: "1920px"}}>
      <Box display="flex" flexWrap="wrap" justifyContent="center" >
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          message={mensajeSnackbar}
        />
        {data.map(contact => (
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
              onClick={() => handleSaveToLocalStorage(contact)}
            >
              <StarIcon
                sx={{
                  top: 10,
                  right: 10,
                  cursor: 'pointer',
                  color: 'yellow',
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

            <Button onClick={handleModalClose}>Cerrar</Button>


            </Stack>
          </Box>

        </Modal>

      
    </div>
  );
};

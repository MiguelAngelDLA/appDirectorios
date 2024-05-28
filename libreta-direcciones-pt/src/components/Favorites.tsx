import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Modal, TextField, Stack, Select, MenuItem, IconButton, Snackbar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { SelectChangeEvent } from "@mui/material/Select";

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
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [isEraseModalOpen, setIsEraseModalOpen] = useState(false);
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

  const handleModifyClick = () => {
    setIsModifyModalOpen(true);
  };
  
  const handleDeleteClick = () => {
    setIsEraseModalOpen(true);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setSelectedContact(prevState => ({
      ...(prevState as ServerData), 
      [name as string]: value
    }));
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
    setIsModifyModalOpen(false);
    setIsEraseModalOpen(false);
  };

  return (
    <div>
      <Box width = "100vh" display="flex" flexWrap="wrap" justifyContent="center" >
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
    </div>
  );
};

import { TextField, Button, Stack, FormControl, Snackbar, InputLabel, Select, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

interface ServerResponse {
  data: ServerData
}

interface ServerData {
  respuesta: string
}

type FormValues = {
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
};

export const AddContactPage = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      calle: "",
      estado: "",
      empresa: "",
      cargo: "",
      notas: "",
      cumpleaños: "",
    },
  });

  const { register, handleSubmit, formState} = form;
  const { errors } = formState;
  const[submitting, setSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility


  const onSubmit = async (data: FormValues)  => {
    try{
      const respuesta = axios.post<ServerResponse>('http://localhost:5000/api/contacts',
        data
      );

      console.log((await respuesta).data);

      setSnackbarOpen(true);
    }
    catch(error){
      console.error("Ocurrió un error cuando se añadia el contacto", error);
    }finally{
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{height: '100vh'}}>
    <center>
    
    <center><h1>Añadir contacto</h1></center>
      
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} width={600} >
          <TextField
            label="nombre"
            type="text"
            {...register("nombre", { required: "Este campo es requerido" })}
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
          />
          <TextField
            label="apellido"
            type="text"
            {...register("apellido", { required: "Este campo es requerido" })}
            error={!!errors.apellido}
            helperText={errors.apellido?.message}
          />
          <TextField
            label="telefono"
            type="tel"
            {...register("telefono", { required: "Este campo es requerido" })}
            error={!!errors.telefono}
            helperText={errors.telefono?.message}
          />
          <TextField
            label="Correo Electrónico"
            type="email"
            {...register("email", { required: "Este campo es requerido" })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Stack spacing={1} direction={"row"}>
          <TextField
            label="calle"
            type="text"
            {...register("calle", { required: "Este campo es requerido" })}
            error={!!errors.calle}
            helperText={errors.calle?.message}
          />
          <FormControl fullWidth>
  <InputLabel id="Estado">Estado</InputLabel>
  <Select
    labelId="Estado"
    id="Estado"
    label="Estado"
    {...register("estado", {required: "Se requiere ingresar el estado"})}
    error={!!errors.estado}
  >           <MenuItem value="no">Seleccione uno...</MenuItem>
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
          </FormControl>
          </Stack>
          <TextField
            label="empresa"
            type="text"
            {...register("empresa", { required: "Este campo es requerido" })}
            error={!!errors.empresa}
            helperText={errors.empresa?.message}
          />
          <TextField
            label="cargo"
            type="text"
            {...register("cargo", { required: "Este campo es requerido" })}
            error={!!errors.cargo}
            helperText={errors.cargo?.message}
          />
          <TextField
            label="notas"
            type="text"
            {...register("notas", { required: "Este campo es requerido" })}
            error={!!errors.notas}
            helperText={errors.notas?.message}
          />
          <TextField
            label="cumpleaños"
            type="date"
            {...register("cumpleaños", { required: "Este campo es requerido" })}
            error={!!errors.cumpleaños}
            helperText={errors.cumpleaños?.message}
            InputLabelProps={{ shrink: true }}  
          />
          <Stack direction={"row"} spacing={2}>
            
          <Button type="submit" variant="contained" color="primary">Añadir</Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="Contacto añadido con Exito"
          />

          <Button type="reset" variant="outlined" color="primary">Limpiar</Button>

          </Stack>
        </Stack>
      </form>
    </center>

    </div>
  );
};

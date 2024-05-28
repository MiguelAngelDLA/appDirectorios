import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function SimpleAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Directorio
        </Typography>
        <Button color="inherit" href="/add">Añadir contacto</Button>
        <Button color="inherit" href="/contacts">Mostrar contacto</Button>
        <Button color="inherit" href="/favorites">Favoritos</Button>
      </Toolbar>
    </AppBar>
  );
}

export default SimpleAppBar;

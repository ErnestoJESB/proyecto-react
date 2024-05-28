import './App.css';

import { Box, Container, Grid} from '@mui/material';
import Header from './Components/Dashboard/Header';
import SideBar from './Components/Dashboard/SideBar';
import Informacion from './Components/Dashboard/Informacion';

function App() {
  return (
  <Box sx={{ display: 'flex', width: '100%' }}>
    <SideBar />
    <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 0, sm: 1, lg: 2 }, marginLeft: '260px' }}>
      {/* <Container> */}
        <Grid item xs={12} md={12} lg={12}>
          <Header />
        </Grid>
        {/* Otros componentes o contenido pueden ir aquí */}
        <Grid container item spacing={2}>
          <Grid item xs={6} md={6} lg={6}>
            <Informacion />
          </Grid>
        </Grid>
      {/* </Container> */}
    </Box>
  </Box>
  );
}
export default App;

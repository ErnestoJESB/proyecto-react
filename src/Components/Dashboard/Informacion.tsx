import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Grid, Paper, Typography } from '@mui/material';
import { formatCurrency } from "../utils/utils";
import axios from 'axios';


const rows = [
  { id: 1, icon: 'Snow', tipo: 'Entrada', monto: 1400, fecha:'Mayo, 2024 a las 15:17' },
  { id: 2, icon: 'Lannister', tipo: 'Salida', monto: 310, fecha:'Mayo, 2024 a las 15:17'},
  { id: 3, icon: 'Lannister', tipo: 'Salida', monto: 2500, fecha:'Mayo, 2024 a las 15:17' },
  { id: 4, icon: 'Stark', tipo: 'Salida', monto: 110, fecha:'Mayo, 2024 a las 15:17' },
  { id: 5, icon: 'Targaryen', tipo: 'Entrada', monto: 200, fecha:'Mayo, 2024 a las 15:17' },
  { id: 6, icon: 'Melisandre', tipo: null, monto: 1852, fecha:'Mayo, 2024 a las 15:17' },
  { id: 7, icon: 'Clifford', tipo: 'Salida', monto: 400, fecha:'Mayo, 2024 a las 15:17' },
  { id: 8, icon: 'Frances', tipo: 'Entrada', monto: 600, fecha:'Mayo, 2024 a las 15:17' },
  { id: 9, icon: 'Roxie', tipo: 'Entrada', monto: 9500, fecha:'Mayo, 2024 a las 15:17' },
];

export default function DataGridDemo() {
    const [rows2, setRows2] = useState([]);

    useEffect(() => {
        // Función para obtener datos desde la API    
        fetchData();
      }, []);

    const fetchData = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        const data = response.data.results;
        console.log(data);
        setRows2(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'icon',
            headerName: 'Tipo',
            width: 150,
            editable: true,
        },
        {
            field: 'name',
            headerName: 'Episodio',
            width: 150,
            editable: true,
        },
        {
            field: 'monto',
            headerName: 'Cantidad',
            type: 'number',
            width: 110,
            valueGetter: (params:any) => {
            return formatCurrency(params);
            }
        }
    ];
    
    return (
        <Box>
            <Paper>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography><strong>Movimientos</strong></Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <DataGrid
                        rows={rows2}
                        columns={columns}
                        initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 5,
                            },
                        },
                        }}
                        pageSizeOptions={[5]}
                    />
                </Grid>            
            </Paper>
        </Box>
    );
}

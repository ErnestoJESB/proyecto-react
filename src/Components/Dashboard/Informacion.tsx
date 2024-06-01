import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid, Paper, Typography } from "@mui/material";
import { formatCurrency } from "../utils/utils";
import axios from "axios";
import Modal from "@mui/material/Modal";
import { idText } from "typescript";
import { idID } from "@mui/material/locale";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DataGridDemo() {
  const [rows2, setRows2] = useState([]);
  const [caracteres, setCaracteres] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [open, setOpen] = useState(false);

  interface Character {
    id: number;
    name: string;
    image: string;
    species: string;
    status: string;
    location: {
      name: string;
    };
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      const data = response.data.results;
      console.log(data);
      setRows2(data);
      setCaracteres(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpen = (character: Character) => {
    setSelectedCharacter(character);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCharacter(null);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Nombre",
      width: 150,
      editable: true,
    },
    {
      field: "species",
      headerName: "Especie",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Estado",
      type: "string",
      width: 110,
      editable: true,
    },
    {
      field: "button",
      headerName: "Modal",
      width: 150,
      renderCell: (params) => (
        <strong>
          <button
            onClick={() => {
              handleOpen(params.row);
            }}
          >
            Ver más información
          </button>
        </strong>
      ),
    },
  ];

  return (
    <Box>
      <Paper>
        <Grid item xs={12} md={12} lg={12}>
          <Typography>
            <strong>Movimientos</strong>
          </Typography>
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedCharacter && (
            <>
              <h2 id="modal-modal-title">{selectedCharacter.name}</h2>
              <p id="modal-modal-description">
                <img
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  width="100"
                />
                <br />
                Especie: {selectedCharacter.species}
                <br />
                Estado: {selectedCharacter.status}
                <br />
                Ubicación: {selectedCharacter.location.name}
              </p>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

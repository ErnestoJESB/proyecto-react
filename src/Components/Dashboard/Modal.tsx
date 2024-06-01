import * as React from "react";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

function Avengers() {
  /* interface Character {
    name: string;
    description: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  } */

  interface Character {
    name: string;
    image: string;
    species: string;
    status: string;
    location: {
      name: string;
    };
  }
  const [characters, setCharacters] = useState<Character[]>([]);
  const publicKey = "b048b222901a2368d89fcf747ca603ff";
  const privateKey = "f0f60117c477a2b4a3470c61fc1801bec0da5478";
  const ts = 2;
  const hash = md5(ts + privateKey + publicKey);
  const limit = 20;
  /*  axios
      .get(
    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}`
        "https://rickandmortyapi.com/api/character"
      )
      .then((response) => {
        console.log(response.data);
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }); */

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}`
      );
      const data = response.data.results;
      setCharacters(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ marginBottom: 4 }}>
        <h1>Characters</h1>
        <ul>
          {characters.map((character) => (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ maxWidth: 345, marginBottom: 4 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={character.image}
                  alt={character.name}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {character.species}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Lugar de origen: {character.location.name}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </ul>
      </Box>
    </Box>
  );
}
export default Avengers;

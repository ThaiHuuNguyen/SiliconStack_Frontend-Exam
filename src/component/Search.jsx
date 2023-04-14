import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  TextField,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { getUser } from "./GitHub";
import { ClipLoader } from "react-spinners";
import Image from "../asset/BK.jpg";
const Search = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    getUser(username)
      .then((response) => {
        setUser(response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleUserClick = () => {
    navigate(`/users/${user.login}/repos`);
  };

  return (
    <>
      <Box
        container
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          height: "150vh",
        }}
        display={"flex"}
        justifyContent={"center"}
      >
        <Grid
          sx={{ margin: "auto", mt: -10 }}
          container
          item
          xs={5}
          md={6}
          spacing={2}
          justify="center"
        >
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent={"center"}
              marginTop={20}
              marginBottom={10}
              padding={3}
              borderRadius={5}
              boxShadow={"5px 10px 20px #000000"}
              sx={{
                hover: {
                  boxShadow: "10px 10px 20px #000000 ",
                },
                height: "200px",
                width: "100%",
                background:
                  "transparent linear-gradient(#667db6,#0082c8,#0082c8,#667db6)",
              }}
            >
              <form onSubmit={handleSubmit}>
                <TextField
                  sx={{
                    border: "0.5px solid white",
                    outline: "none",

                    width: "800px",
                    borderRadius: "7px",
                    backgroundColor: "white",
                    "& .MuiInputLabel-root": {
                      fontSize: "1.5rem",
                      color: "#52c234",
                    },
                  }}
                  label="Search GitHub"
                  fullWidth
                  value={username}
                  onChange={handleInputChange}
                />
                <Button
                  sx={{
                    backgroundColor: "#4806a5",
                    mt: 0,
                    margin: "0 8px",
                    height: "56px",
                    hover: { backgroundColor: "#000000, #4806a5" },
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!username || loading}
                >
                  Search
                </Button>
              </form>
            </Box>
          </Grid>
          <Grid
            sx={{ margin: "auto", mt: -8 }}
            container
            item
            xs={5}
            md={6}
            spacing={2}
            justify="center"
          >
            <Box display={"flex"} justifyContent={"center"}>
              {loading ? (
                <ClipLoader color="#FFF94C" loading={loading} size={50} />
              ) : user ? (
                <div>
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      color: "#ADD100",
                    }}
                    variant="h4"
                  >
                    {user.login}
                  </Typography>
                  <img src={user.avatar_url} alt={`${user.login} avatar`} />
                  <Box display="flex" justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUserClick}
                    >
                      View Repositories
                    </Button>
                  </Box>
                </div>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Search;

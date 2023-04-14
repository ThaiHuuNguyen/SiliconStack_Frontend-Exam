import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Grid, Typography, Box } from "@mui/material";
import { getRepositoryCommits, getUserRepos } from "./GitHub";
import RepositoryCommits from "./RepositoryCommits";
import { ClipLoader } from "react-spinners";
import Image from "../asset/BK.jpg";
const UserRepos = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getUserRepos(username)
      .then((response) => {
        setRepos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Unable to fetch repositories.");
        setLoading(false);
      });
  }, [username]);

  const handleRepoClick = (repoName) => {
    navigate(`/users/${username}/repos/${repoName}/commits`);
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
        <Box mt={10}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "#ADD100",
            }}
            variant="h4"
            component="h1"
            gutterBottom
          >
            {username} Repositories
          </Typography>
          {loading ? (
            <ClipLoader color="#FFF94C" loading={loading} size={50} />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : repos.length ? (
            <Grid container spacing={2}>
              {repos.map((repo) => (
                <Grid item xs={12} sm={12} key={repo.id}>
                  <Button
                    sx={{
                      backgroundColor: "white",
                      "&:hover": {
                        backgroundColor: "gray",
                      },
                    }}
                    variant="outlined"
                    fullWidth
                    onClick={() => handleRepoClick(repo.name)}
                  >
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{
                        fontFamily: "Arial",
                        fontSize: "24px",
                        color: "#333",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "0.5rem",
                        marginRight: "1rem",
                      }}
                    >
                      {repo.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        marginBottom: "0.5rem",
                        marginRight: "1rem",
                      }} // Thêm margin cho Typography này
                    >
                      {repo.description}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ textAlign: "center", marginBottom: "0.55rem" }} // Thêm margin cho Typography này
                    >
                      {repo.stargazers_count} Stars | {repo.open_issues_count}{" "}
                      Issues
                    </Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              sx={{
                color: "#e74c3c",
              }}
              variant="h3"
            >
              No repositories found.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default UserRepos;

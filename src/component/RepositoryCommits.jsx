import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRepoCommits } from "./GitHub";
import { Button, Typography, Box } from "@mui/material";
import { ClipLoader } from "react-spinners";
import Image from "../asset/BK.jpg";
const RepositoryCommits = () => {
  const { username, repo } = useParams();
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getRepoCommits(username, repo)
      .then((response) => {
        setCommits(response.data.slice(0, 10));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [username, repo]);

  const handleCommitClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <Box
        container
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <Box display={"flex"} justifyContent={"center"}>
          {" "}
          <Typography sx={{ color: "#ADD100" }} variant="h4" gutterBottom>
            Latest Commits for {username}/{repo}
          </Typography>
        </Box>
        <Box sx={{ mt: 10 }} display={"flex"} justifyContent={"center"}>
          {loading ? (
            <ClipLoader color="#FFF94C" loading={loading} size={50} />
          ) : commits.length > 0 ? (
            <Button
              sx={{
                color: "#FFF94C",
                hover: {
                  boxShadow: "10px 10px 20px #000000 ",
                },
                height: "200px",
                width: "50%",
                // background: "transparent linear-gradient(#00C9FF,#92FE9D)",
              }}
            >
              {commits.map((commit) => (
                <li
                  key={commit.sha}
                  onClick={() => handleCommitClick(commit.html_url)}
                >
                  <Typography variant="h4">
                    {commit.commit.author.name}
                  </Typography>
                  <Typography variant="h5">{commit.commit.message}</Typography>
                  <Typography variant="h6">ID: {commit.sha}</Typography>
                </li>
              ))}
            </Button>
          ) : (
            <Typography variant="subtitle1">No commits found.</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RepositoryCommits;

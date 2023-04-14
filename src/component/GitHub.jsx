import axios from "axios";

const API_URL = "https://api.github.com";

export const getUser = (username) => {
  return axios.get(`${API_URL}/users/${username}`);
};

export const getUserRepos = (username) => {
  return axios.get(`${API_URL}/users/${username}/repos`);
};

export const getRepoCommits = (owner, repo) => {
  return axios.get(`${API_URL}/repos/${owner}/${repo}/commits`);
};

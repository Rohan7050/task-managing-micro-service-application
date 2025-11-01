import axios from 'axios';

export const apiClient = axios.create({
  baseURL: "https://task-manging.dev",
  withCredentials: true,
});
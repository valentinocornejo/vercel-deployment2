import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3002', // Reemplaza con la URL de tu servidor
  withCredentials: true, // Habilita el uso de credenciales (cookies)
});

export default api;

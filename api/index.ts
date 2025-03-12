
import axios from 'axios';
import { API_BASE_URL, CITIES_API_BASE_URL } from '../constants';


const weaterApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const citiesApi = axios.create({
  baseURL: CITIES_API_BASE_URL,
  timeout: 10000,
});

export { weaterApi, citiesApi };

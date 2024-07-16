import axios from 'axios';
import { env } from '../env/environment';

export default axios.create({
    baseURL: env.AUTH_BASE_URL
})
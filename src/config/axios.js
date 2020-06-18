import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : "https://mighty-retreat-50169.herokuapp.com/"
});

export default clienteAxios;
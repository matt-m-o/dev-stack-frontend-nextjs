import axios from 'axios';


const { NEXT_PUBLIC_API_BASE_URL } = process.env;


export async function apiClient (method= 'GET', url='/', params= {}) {
    method = method.toUpperCase();

    return axios({
        url: NEXT_PUBLIC_API_BASE_URL + url,
        method,
        params,
    });
}
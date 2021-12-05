import axios, { AxiosResponse } from 'axios'
import { EmissionDTO } from '../models/EmissionDTO';

const api = axios.create({
    baseURL: process.env.REACT_APP_CO2_EMISSIONS_API
});

const getEmissionsService = async (year: string): Promise<AxiosResponse<EmissionDTO[]> | void> => {
    return (
        api.get(`/${year}`).then(async res => {
            return res.data;
        })
        .catch(err => {
            console.log('Error: ', err.message);
        })
    );
}

export default getEmissionsService;
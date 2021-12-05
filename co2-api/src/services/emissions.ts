import axios from 'axios';
import csv from 'csvtojson';
import { Converter } from 'csvtojson/v2/Converter';

export async function getEmissionsService(year: string): Promise<Converter | void> {
    return axios.get(`http://ladataverte.fr/api/1.0/data_points?id_indicators[]=1&childrensOf=13000010&type_place[]=country&from=${year}-01-01&to=${year}-12-31`)
        .then(async res => {
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.status);
            console.log('Date in Response header:', headerDate);

            const emissions = await csv().fromString(res.data);

            return emissions;
        })
        .catch(err => {
            console.log('Error: ', err.message);
        });
}
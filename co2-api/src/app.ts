import express, { NextFunction, Request, Response } from 'express';
import { getEmissions } from './controllers/emissions';

require('dotenv').config();

// Init Express server
export const app = express();


app.use(function(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", process.env.WEBAPP_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', (req: Request, res: Response) => res.send('CO2 emissions API'));
app.get('/:year', getEmissions);
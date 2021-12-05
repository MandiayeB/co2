import { Request, Response } from 'express';
import { getEmissionsService } from '../services/emissions';

export async function getEmissions (req: Request, res: Response) {
    console.log(`[API Emissions] ${getEmissions.name}: Call from ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`);
    const emissions = await getEmissionsService(req.params.year);
    res.status(200).send(emissions);
}
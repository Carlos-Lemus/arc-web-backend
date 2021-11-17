import { Request, Response } from "express";
import { Record } from "../models";

const getRecords = async (req: Request, res: Response): Promise<Response> => {

    const dateRequest: string | null = (req.headers[`date-request`] as string) || null;

    const dateStart: Date = new Date(`${dateRequest}T00:00:00Z`);
    const dateEnd: Date = new Date(`${dateRequest}T00:00:00Z`);

    dateEnd.setDate(dateEnd.getDate() + 1);

    try {

        let records = [];

        if (dateRequest) {
            records = await Record.find({
                dateFull: {
                    $gte: dateStart,
                    $lt: dateEnd  // +1 day
                }
            });
        } else {
            records = await Record.find();
        }

        const highs = records.filter(record => record.temperature > 37).length;
        const normals = records.filter(record => record.temperature <= 37).length;

        return res.status(200).json({
            success: true,
            records,
            highs,
            normals,

        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: 'Ha ocurrido un error en el servidor :('
        });
    }

}

const getRecordsDataByYear = async (req: Request, res: Response): Promise<Response> => {

    const year: string | null = (req.headers[`year`] as string) || '0';

    const yearParser: number = parseInt(year);


    const monthsValues: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    try {

        for(let index = 0; index < monthsValues.length; index++) {
            const dateStart: Date = new Date(yearParser, index, 0, 0, 0, 0);
            const dateEnd: Date = new Date(yearParser, index + 1, 0, 0, 0, 0);

            const records = await Record.find({
                dateFull: {
                    $gte: dateStart,
                    $lt: dateEnd 
                },
                temperature: {
                    $gte: 38
                }
            });
            monthsValues[index] = records.length;
        }
        
        return res.status(200).json({
            success: true,
            monthsValues
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            msg: 'Ha ocurrido un error en el servidor :('
        });
    }

}

export {
    getRecords,
    getRecordsDataByYear,
}
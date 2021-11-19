import { Record } from "../models";

const dbAddRecord = async (data: string) => {

    const dateFull = new Date().toLocaleString('sv').replace(' ', 'T') + '.000+00:00';

    const dataArray: string[] = data.split(';');

    const temperature = parseFloat(dataArray[0])
    
    let record = null;
    
    try {

        record = new Record({
            number: parseInt(dataArray[1]),
            dateFull,
            temperature,
            result: temperature >= 38 ? 'Alta' : 'Normal',
        });


        await record.save();

        return record;

    } catch (error) {
        console.log(error)
        return null;
    } 

}

export default dbAddRecord;
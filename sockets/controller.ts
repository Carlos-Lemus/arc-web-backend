import { Socket } from "socket.io";
import SerialPort from 'serialport';
import { Record } from "../models";

const controllerSocket = (socket: Socket, parser: SerialPort.parsers.Readline) => {
    
    parser.on('open', () => {
        console.log('open connection')
    });

    parser.on('data', async (data) => {

        const dateFull = new Date();

        const dataArray: string[] = data.split(';');

        const temperature = parseFloat(dataArray[0])

        let record = null;


        try {

            record = new Record({
                number: parseInt(dataArray[1]),
                dateFull,
                temperature,
                result: temperature > 37? 'Alta' : 'Normal',
            });

            // return console.log(record);

            await record.save();

        } catch (error) {
            console.log(error)
        } finally {
            socket.broadcast.emit('/socket/sendTemp', record);
        }

    });

}

export default controllerSocket;
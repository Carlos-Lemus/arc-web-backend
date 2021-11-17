import { model, Schema } from "mongoose";

interface Record {
    number: number;
    dateFull: Date;
    temperature: number;
    result: string;
}

const schema = new Schema<Record>({
    number: {
        type: Number,
        required: true,
    },
    dateFull: {
        type: Date,
        required: true,
    },
    temperature: {
        type: Number,
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
});

schema.methods.toJSON = function () {
    const { _id: id, dateFull, __v, ...props } = this.toObject();

    const dateArray = dateFull.toLocaleString().slice(0, 19).replace("T", " ").split(' ');

    return {
        ...props,
        id,
        date: dateArray[0],
        hour: dateArray[1],
        dateFull
    }
}

const RecordModel = model<Record>('record', schema);

export default RecordModel;
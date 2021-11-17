import { Schema, model, Types } from 'mongoose';

interface User {
    role: Object;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    age: number;
    phone: string;
    direction: string;
}

const schema = new Schema<User>({
    role: {
        type: Types.ObjectId,
        required: true,
        ref: 'Role'
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    direction: {
        type: String,
        required: true,
    },
});

schema.methods.toJSON = function() {
    const { _id, __v, password, role: { _id: id, ...propsRole }, ...props } = this.toObject();

    return {
        ...props,
        id: _id,
        role: {
            ...propsRole,
            id,
        },
    };
};

const modelUser = model<User>('User', schema); 

export default modelUser;
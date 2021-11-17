import { Schema, model} from 'mongoose';

interface Role {
    name: string,
}

const schema = new Schema<Role>({
    name: {
        type: String,
        required: true,
    },
});

schema.methods.toJSON = function() {
    const { _id, __v, ...props } = this.toObject();

    return {
        ...props,
        id: _id,
    };
};

const modelRole = model<Role>('Role', schema); 


export default modelRole;
import { Schema, model, Document } from 'mongoose';

export interface IEvent extends Document {
    name: string;
    description: string;
    category: string[];
    date: Date;
    venue: string;
    price: number;
    image: string;
}

const eventSchema = new Schema<IEvent>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,

    },
    category: {
        type: [String],

    }, date: { type: Date, required: true },
    venue: { type: String },
    price: { type: Number },
    image: { type: String },
});
export default model<IEvent>('Event', eventSchema);
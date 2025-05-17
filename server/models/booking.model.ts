import { Schema, model, Document } from 'mongoose';

export interface IBooking extends Document {
    user: Schema.Types.ObjectId;
    event: Schema.Types.ObjectId;
    tickets: number;
    status: boolean;
    bookedAt: Date;
}

const bookingSchema = new Schema<IBooking>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    tickets: {
        type: Number,

    },
    status: {
        type: Boolean,
        default: false
    },
    bookedAt: {
        type: Date,
        default: Date.now
    }
})

export default model<IBooking>('Booking', bookingSchema);
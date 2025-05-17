
export interface Event {
    _id: string;
    name: string;
    date: string;
    venue: string;
    description: string;
    price: number;
    image: string;

}

export interface Booking {
    _id: string;
    user: string;
    event: Event;
    tickets: number;
    status: boolean;
    bookedAt: string;
}

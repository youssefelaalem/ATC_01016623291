
// export interface Event {
//     _id: string;
//     title: string;
//     date: string;
//     location: string;
//     description: string;
// }

export interface Event {
    // _id: string | null;
    name: string;
    description: string;
    category: string[];
    date: Date;
    venue: string;
    price: number;
    image: string;

}
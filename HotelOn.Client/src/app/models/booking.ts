export class Booking {
    id: number;
    roomID: number;
    paymentOptionID: number;
    bookingName: string;
    duration: number;
    capacity: number;
    startOn: Date;
    total: number;
    isActive: boolean;
    createdAt: Date;
}

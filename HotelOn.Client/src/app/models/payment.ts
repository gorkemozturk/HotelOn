export class Payment {
    id: number;
    bookingID: number;
    amount: number;
    remainingAmount: number;
    isDone: boolean;
    paymentDay: Date;
    updatedAt: Date;
    createdAt: Date;
}

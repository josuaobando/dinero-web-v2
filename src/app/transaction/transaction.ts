export class Transaction {
    id: number;
    date: string;
    address: string;
    requestedAmount: number;
    rate: number;
    finalAmount: number;
    amount: number;
    fee: number;
    mFee: number;
    reference: number;
    processingFee: number;
    exchangeFee: number;

    constructor() {
    }
}

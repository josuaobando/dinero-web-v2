import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {Transaction} from './transaction';
import {WSService} from "../shared/services/ws.services";

@Injectable()
export class TransactionService extends WSService{

    getTransactions(req: Object): Promise<Array<Transaction>> {
        req['method'] = 'report';
        return this.exPost(req, this.extractTransactionsData)
    }

    private extractTransactionsData(res: Response){
        let transactions = Array<Transaction>();

        let body = res.json();
        if(body && body.transactions){

            let transactionsData = body.transactions;
            if(transactionsData){
                for (let _i = 0; _i < transactionsData.length; _i++) {
                    let transactionData = transactionsData[_i];
                    let transaction = new Transaction();

                    transaction.id = <number>transactionData.sbTransaction_id;
                    transaction.date = <string>transactionData.created_at;
                    transaction.amount = <string>transactionData.amount;

                    transactions.push(transaction);
                }
            }

        }

        return transactions;
    }

}

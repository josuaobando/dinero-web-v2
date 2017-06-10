import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {AppSettings} from '../../app.config';
import {Transaction} from './transaction';

@Injectable()
export class TransactionService {

    private wsAPI = AppSettings.WS_API + '/report';

    constructor(private http: Http){}

    getTransactions(req: Object): Promise<Array<Transaction>> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.wsAPI, req, options).toPromise()
            .then(this.extractTransactionsData)
            .catch(this.handleErrorPromise);
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

    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }
}

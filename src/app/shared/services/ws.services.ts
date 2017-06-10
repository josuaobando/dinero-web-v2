import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {AppSettings} from '../../../app.config';

@Injectable()
export class WSService {

    /**
     * @param http
     */
    constructor(private http: Http) {
    }

    /**
     * execute post
     *
     * @param req
     * @param success callback
     *
     * @returns {Maybe<T>|Observable<R|T>|Promise<R>}
     */
    exPost(req: Object, success): Promise<Object> {

        let userStorage = localStorage.getItem('user');
        if(userStorage){
            let user = JSON.parse(userStorage);
            req['token'] = user.token;
        }

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        let method= req['method'];
        delete req['method'];

        let wsAPI = AppSettings.WS_API + method;
        if (AppSettings.isDEV) {
            req['XDEBUG_SESSION_START'] = 'ECLIPSE_DBGP';
        }

        return this.http.post(wsAPI, req, options).toPromise()
            .then(success)
            .catch(this.handleErrorPromise);
    }

    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }
}

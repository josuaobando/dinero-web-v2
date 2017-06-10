import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
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
     * @param error callback
     *
     * @returns {Maybe<T>|Observable<R|T>|Promise<R>}
     */
    exPost(req: Object, success, error): Promise<Object> {

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        let wsAPI = AppSettings.WS_API + '/' + req['method'];
        if (AppSettings.isDEV) {
            req['XDEBUG_SESSION_START'] = 'ECLIPSE_DBGP';
        }

        return this.http.post(wsAPI, req, options).toPromise()
            .then(success)
            .catch(error);
    }
}

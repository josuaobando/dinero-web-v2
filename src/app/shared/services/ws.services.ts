import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {AppSettings} from '../../../app.config';

@Injectable()
export class WSService{

    public code: number;
    public message: string;
    public lastResponse: Object;

    /**
     * @param http
     */
    constructor(private http: HttpClient){
        this.code = 0;
        this.message = '';
        this.lastResponse = null;
    }

    /**
     *
     * @param req
     * @param callback
     */
    exPost(req: Object, callback){
        let self = this;
        this.post(req, function(res){

            try{
                self.code = res.code;
                self.message = res.message;
                self.lastResponse = res.response;

                callback(self.lastResponse, self.message);
            }catch(e){
                console.log((<Error>e).message);
                callback(null, 'Error');
            }

            /*
             if(typeof res === 'undefined' || res === null){
             callback(null);
             }else{

             if(typeof res.response === 'object' && res.response !== null){
             callback(res.response);
             }else if(res.state === 'ok'){
             callback(true);
             }else{
             callback(null);
             }
             }
             */
        })
    }

    /**
     * execute post
     *
     * @param req
     * @param callback
     *
     * @returns {Observable<R|T>|Promise<R>|Maybe<T>}
     */
    post(req: Object, callback): Promise<Object>{

        let wsAPI = AppSettings.WS_API;
        if(AppSettings.isDEV){
            req['XDEBUG_SESSION_START'] = 'ECLIPSE_DBGP';
        }

        req['format'] = 'json';
        req['userAgent'] = navigator.userAgent;
        req['auth'] = AppSettings.WS_AUTH;
        req['f'] = req['method'];
        delete req['method'];

        let userStorage = localStorage.getItem('user');
        if(userStorage){
            let user = JSON.parse(userStorage);
            req['token'] = user.token;
        }

        let headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        let body = JSON.stringify(req);
        return this.http.post(wsAPI, body, {headers: headers}).toPromise()
            .then(callback);
        //.catch(this.handleErrorPromise);
    }

    private handleErrorPromise(error: Response | any){
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }
}

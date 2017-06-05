import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {AppSettings} from '../../app.config';
import {User} from './user';

@Injectable()
export class UserService {

    private wsAPI = AppSettings.WS_API + '/authenticate';

    constructor(private http: Http){}

    loginUser(req: Object): Promise<User> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.wsAPI, req, options).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    private extractData(res: Response){

        let user = new User();
        let body = res.json();
        if(body && body.loginInformation){
            let loginInformation = body.loginInformation;
            user.token = loginInformation.token;
            user.name = loginInformation.name;
        }

        return user;
    }

    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }
}

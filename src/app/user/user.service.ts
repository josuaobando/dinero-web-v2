import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {User} from './user';
import {WSService} from "../shared/services/ws.services";

@Injectable()
export class UserService extends WSService {
    /*
     loginUser(req: Object): Promise<any> {
     req['method'] = 'authenticate';
     return this.exPost(req, this.extractUserData)
     }
     */

    loginUser(req: Object, callback) {
        req['method'] = 'authenticate';
        this.exPost(req, function(res, message) {
            let user = new User();

            if (res && res.account) {
                user.token = res.token;
                user.name = res.account.username;
            }

            callback(user, message);
        })
    }

    logoutUser(req: Object): Promise<any> {
        req['method'] = 'logout';
        return this.post(req, this.extractLogoutData)
    }

    extractLogoutData(res: Response) {

        let logout: boolean;
        let body = res.json();
        if (body && body.logout) {
            logout = body.logout;
        }

        return logout;
    }

}

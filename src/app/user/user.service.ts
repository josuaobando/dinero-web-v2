import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {User} from './user';
import {WSService} from "../shared/services/ws.services";

@Injectable()
export class UserService extends WSService {

    loginUser(req: Object): Promise<User> {

        req['method'] = 'authenticate';
        return this.exPost(req, this.extractUserData)
    }

    private extractUserData(res: Response) {

        let user = new User();
        let body = res.json();
        if (body && body.loginInformation) {
            let loginInformation = body.loginInformation;
            user.token = loginInformation.token;
            user.name = loginInformation.name;
        }

        return user;
    }

    logoutUser(req: Object): Promise<boolean> {
        req['method'] = 'logout';
        return this.exPost(req, this.extractLogoutData)
    }

    private extractLogoutData(res: Response) {

        let logout: boolean;
        let body = res.json();
        if (body && body.logout) {
            logout = body.logout;
        }

        return logout;
    }

}

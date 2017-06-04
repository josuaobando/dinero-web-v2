import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './../user/user.service';
import {User} from './../user/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;

    userData = new User();
    errorMessage: String;

    constructor(public router: Router, private userService: UserService) {
    }

    ngOnInit() {
    }

    loginUser(username, password) {

        var req = {username: username, password: password};

        this.userService.loginUser(req)
            .then(user => {
                this.userSession(user);
            }, error => this.errorMessage = <any>error);
    }

    private userSession(user) {
        this.userData.token = user.token;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(this.userData));
    }

}

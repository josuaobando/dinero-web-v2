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

    userData = new User();
    errorMessage: String;

    constructor(public router: Router, private userService: UserService) {
    }

    ngOnInit() {
    }

    loginUser(username, password) {

        this.userData.login = username;
        let req = {email: username, password: password};

        this.userService.loginUser(req)
            .then(user => {
                this.userSession(user);
            }, error => this.errorMessage = <any>error);
    }

    private userSession(user) {
        this.userData.token = user.token;
        this.userData.name = user.name;
        if(user.token != null && user.token != ''){
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(this.userData));

            this.router.navigate(['/dashboard']);
        }else{
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('user', '');

            this.router.navigate(['/login']);
        }
    }

}

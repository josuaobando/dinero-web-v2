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

    user = new User();
    errorMessage: String;

    constructor(public router: Router, private userService: UserService) {
    }

    ngOnInit() {
    }

    loginUser() {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['/dashboard']);
        /*
        let req = {email: this.user.login, password: this.user.password};
        this.userService.loginUser(req)
            .then(user => {
                this.userSession(user);
            }, error => this.errorMessage = <any>error);
            */
    }

    private userSession(user) {
        this.user.token = user.token;
        this.user.name = user.name;
        if(user.token != null && user.token != ''){
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(this.user));

            this.router.navigate(['/dashboard']);
        }else{
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('user', '');

            this.router.navigate(['/login']);
        }
    }

}

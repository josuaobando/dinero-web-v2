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
        let req = {username: this.user.login, password: this.user.password};

        let self = this;
        this.userService.loginUser(req, function(user, message){
            self.user.token = user.token;
            self.user.name = user.name;
            if(user.token != null && user.token != ''){
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('user', JSON.stringify(self.user));

                self.router.navigate(['/dashboard']);
            }else{
                localStorage.setItem('isLoggedIn', 'false');
                localStorage.setItem('user', '');

                self.router.navigate(['/login']);
            }
        });
    }

}

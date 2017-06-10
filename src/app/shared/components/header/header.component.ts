import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {User} from "../../../user/user";
import {UserService} from "../../../user/user.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    /**
     * @type {User}
     */
    currentUser = new User();
    errorMessage: string;

    constructor(private translate: TranslateService, public router: Router, private userService: UserService) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        let userStorage = localStorage.getItem('user');
        if (userStorage) {
            let obj = JSON.parse(userStorage);
            this.currentUser.login = obj.login;
            this.currentUser.name = obj.name;
        }
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedOut() {
        this.userService.logoutUser({})
            .then(res => {
                this.logout(res);
            }, error => this.errorMessage = <any>error);
    }

    private logout(res) {
        if (res) {
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
            this.router.navigate(['/login']);
        }
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}

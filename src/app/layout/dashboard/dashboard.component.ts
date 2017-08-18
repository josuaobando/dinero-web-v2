import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];

    constructor(){
        this.sliders.push({
            imagePath: 'assets/images/',
            label: 'BITCOIN',
            text: 'Digital Centralized Peer to Peer'
        });

        this.alerts.push({
            id: 1,
            type: 'success',
            message: '',
        }, {
            id: 2,
            type: 'warning',
            message: '',
        });
    }

    ngOnInit(){
    }

    public closeAlert(alert: any){
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}

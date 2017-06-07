import {Component, OnInit} from '@angular/core';
import {Transaction} from './../../transaction/transaction';
import {Transactions} from './../../transaction/data';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

    beginDate: string;
    endDate: string;

    filteredItems: Transaction[];
    pages: number = 4;
    pageSize: number = 10;
    pageNumber: number = 0;
    currentIndex: number = 1;
    items: Transaction[];
    pagesIndex: Array<number>;
    pageStart: number = 1;

    constructor() {
        this.filteredItems = Transactions;
        this.init();
    };

    ngOnInit() {
    }

    init() {
        this.currentIndex = 1;
        this.pageStart = 1;
        this.pages = 4;

        this.pageNumber = parseInt("" + (this.filteredItems.length / this.pageSize));
        if (this.filteredItems.length % this.pageSize != 0) {
            this.pageNumber++;
        }

        if (this.pageNumber < this.pages) {
            this.pages = this.pageNumber;
        }

        this.refreshItems();
        console.log("this.pageNumber :  " + this.pageNumber);
    }

    fillArray(): any {
        let obj = new Array();
        for (let index = this.pageStart; index < this.pageStart + this.pages; index++) {
            obj.push(index);
        }
        return obj;
    }

    refreshItems() {
        this.items = this.filteredItems.slice((this.currentIndex - 1) * this.pageSize, (this.currentIndex) * this.pageSize);
        this.pagesIndex = this.fillArray();
    }

    prevPage() {
        if (this.currentIndex > 1) {
            this.currentIndex--;
        }
        if (this.currentIndex < this.pageStart) {
            this.pageStart = this.currentIndex;
        }
        this.refreshItems();
    }

    nextPage() {
        if (this.currentIndex < this.pageNumber) {
            this.currentIndex++;
        }
        if (this.currentIndex >= (this.pageStart + this.pages)) {
            this.pageStart = this.currentIndex - this.pages + 1;
        }

        this.refreshItems();
    }

    setPage(index: number) {
        this.currentIndex = index;
        this.refreshItems();
    }
    
}

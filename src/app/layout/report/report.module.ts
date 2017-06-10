import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {TransactionService} from './../../transaction/transaction.service';
import { ReportComponent } from './report.component';
import { TablesRoutingModule } from './report-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        PageHeaderModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    declarations: [
        ReportComponent
    ],
    providers: [
        TransactionService
    ],
})
export class ReportModule { }

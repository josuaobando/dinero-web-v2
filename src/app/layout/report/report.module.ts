import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportComponent } from './report.component';
import { TablesRoutingModule } from './report-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        PageHeaderModule
    ],
    declarations: [ReportComponent]
})
export class ReportModule { }

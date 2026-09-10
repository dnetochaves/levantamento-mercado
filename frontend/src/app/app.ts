import { Component } from '@angular/core';

import { ReportPage } from './report/report-page';

@Component({
  imports: [ReportPage],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}

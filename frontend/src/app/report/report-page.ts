import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { REPORT_DATA } from './report-data';

@Component({
  selector: 'app-report-page',
  imports: [MatToolbarModule, MatCardModule, MatExpansionModule, MatButtonModule],
  templateUrl: './report-page.html',
  styleUrl: './report-page.scss',
})
export class ReportPage {
  protected readonly data = REPORT_DATA;
}

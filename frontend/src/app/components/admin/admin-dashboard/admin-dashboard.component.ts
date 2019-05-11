import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as CanvasJS from './../../../../assets/js/canvasjs.min';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    this.loadGraph1();
    this.loadGraph2();
  }

  loadGraph1() {
    const chart = new CanvasJS.Chart('chartContainer' , {
      theme: 'light2', // "light1", "light2", "dark1", "dark2"
      exportEnabled: true,
      animationEnabled: true,

      data: [{
        type: 'pie',
        startAngle: 25,
        toolTipContent: '<b>{label}</b>: <span>{y}%</span>',
        showInLegend: 'true',
        legendText: '{label}',
        indexLabelFontSize: 14,
        indexLabel: '{label} - {y}%',
        dataPoints: [
          { y: 51.08, label: 'Tetouan' },
          { y: 27.34, label: 'Rabat' },
          { y: 10.62, label: 'Casablanca' },
          { y: 5.02, label: 'Tanger' },
          { y: 12.07, label: 'Fes' }
        ]
      }]
    });
    chart.render();
  }

  loadGraph2() {
    const chart = new CanvasJS.Chart('chartContainer2', {
      animationEnabled: true,
      exportEnabled: true,
      data: [{
        type: 'column',
        dataPoints: [
          { y: 71, label: 'Janvier' },
          { y: 55, label: 'Fevrier' },
          { y: 50, label: 'Mars' },
          { y: 65, label: 'Avril' },
          { y: 95, label: 'Mai' },
          { y: 68, label: 'Juin' },
          { y: 28, label: 'Juillet' },
          { y: 34, label: 'Aout' },
          { y: 14, label: 'Septembre' }
        ]
      }]
    });
    chart.render();
  }
}

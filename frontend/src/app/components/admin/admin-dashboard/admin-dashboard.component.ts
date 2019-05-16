import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as CanvasJS from './../../../../assets/js/canvasjs.min';
import { StatService } from './../../../services/stat/stat.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  public allStats: any;
  public statSubscription: Subscription;
  constructor(
    private statService: StatService
  ) { }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.statSubscription = this.statService.getGlobalStatistics().subscribe(
      (data) => {
        console.log(data);
        this.allStats = data;
      },
      (error) => {
        console.log(error);
        alert('Erreur survenue sur la plateforme !');
      },
      () => {
        // this.loadGraph1();
        this.loadRevenuesGraph();
      }
    );
  }
  loadGraph1() {
    const chart = new CanvasJS.Chart('chartContainer', {
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

  loadRevenuesGraph() {

    const chart = new CanvasJS.Chart('revenuesContainer', {
      animationEnabled: true,
      theme: 'light2',
      axisX: {
        valueFormatString: 'DD MMM',
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: 'Revenues en DH',
        crosshair: {
          enabled: true
        }
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        verticalAlign: 'bottom',
        horizontalAlign: 'left',
        dockInsidePlotArea: true,
      },
      data: [{
        type: 'spline',
        showInLegend: true,
        name: 'Revenues entreprise',
        xValueFormatString: 'DD MMM, YYYY',
        color: '#008000',
        dataPoints: this.getPositiveRevenue()
      },
      {
        type: 'spline',
        showInLegend: true,
        name: 'Gains perdus',
        color: '#F08080',
        dataPoints: this.getNegativeRevenue()
      }]
    });
    chart.render();
  }

  getPositiveRevenue() {
    const revenuePositive = [];
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.allStats.revenues_stats.length; index++) {
      const element = this.allStats.revenues_stats[index];
      const elt = {x : new Date() , y : 0};
      elt.x = new Date(element.x[0], element.x[1] , element.x[2]);
      elt.y = element.y;
      revenuePositive.push(elt);
    }
    console.log(revenuePositive);
    return revenuePositive;
  }

  getNegativeRevenue() {
    const revenueNegative = [];
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.allStats.lost_revenues_stats.length; index++) {
      const element = this.allStats.lost_revenues_stats[index];
      const elt = {x : new Date() , y : 0};
      elt.x = new Date(element.x[0] , element.x[1] , element.x[2]);
      elt.y = element.y;
      revenueNegative.push(elt);
    }
    console.log(revenueNegative);
    return revenueNegative;
  }

  ngOnDestroy(): void {
    this.statSubscription.unsubscribe();
  }
}

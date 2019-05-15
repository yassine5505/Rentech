import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as CanvasJS from './../../../../assets/js/canvasjs.min';
import { StatService } from './../../../services/stat/stat.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
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
        this.loadAdRateGraph();
        this.loadRevenuesGraph();
        this.getAnnoncesTerminated();
      }
    );
  }
  loadAdRateGraph() {
    const chart = new CanvasJS.Chart('tauxAnonceContainer', {
      theme: 'light2', // "light1", "light2", "dark1", "dark2"
      exportEnabled: true,
      animationEnabled: true,
      axisX: {
        title: 'Mois'
      },
      axisY: {
        title: 'Nombre d\'annonces ',
        titleFontColor: '#4F81BC',
        lineColor: '#F08080',
        labelFontColor: '#4F81BC',
        tickColor: '#F08080'
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: 'column',
          name: 'Annonces correctement terminées',
          showInLegend: true,
          yValueFormatString: '#,##0.# Units',
          dataPoints: this.getAnnoncesTerminated()
        },
        {
          type: 'column',
          name: 'Annonces annulées',
          showInLegend: true,
          yValueFormatString: '#,##0.# Units',
          dataPoints:  this.getAnnoncesCancelled()
        },
      ]
    });
    chart.render();
  }


  getAnnoncesTerminated() {
    const annonces = [];
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.allStats.ads.length; index++) {
      const  element = this.allStats.ads[index];
      const elt = { label: '',  y: 0 };
      elt.label = Object.keys(element)[0];
      elt.y = Object.values(element)[0].finished_ads;
      annonces.push(elt);
    }
    return annonces;
  }

  getAnnoncesCancelled() {
    const annonces = [];
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.allStats.ads.length; index++) {
      const  element = this.allStats.ads[index];
      const elt = { label: '',  y: 0 };
      elt.label = Object.keys(element)[0];
      elt.y = Object.values(element)[0].canceled_ads;
      annonces.push(elt);
    }
    return annonces;
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
      const dataStat = new Date(element.x[0], element.x[1] - 1 , element.x[2]);
      if ( index > 0 && moment(revenuePositive[revenuePositive.length - 1].x).isSame(moment(dataStat))) {
        elt.y += element.y;
      } else {
        elt.x = dataStat;
        elt.y = element.y;
        revenuePositive.push(elt);
      }
    }
    return revenuePositive;
  }

  getNegativeRevenue() {
    const revenueNegative = [];
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.allStats.lost_revenues_stats.length; index++) {
      const element = this.allStats.lost_revenues_stats[index];
      const elt = {x : new Date() , y : 0};
      const dataStat = new Date(element.x[0], element.x[1] - 1 , element.x[2]);
      if ( index > 0 && moment(revenueNegative[revenueNegative.length - 1].x).isSame(moment(dataStat))) {
        elt.y += element.y;
      } else {
        elt.x = dataStat;
        elt.y = element.y;
        revenueNegative.push(elt);
      }
    }
    return revenueNegative;
  }

  ngOnDestroy(): void {
    this.statSubscription.unsubscribe();
  }
}

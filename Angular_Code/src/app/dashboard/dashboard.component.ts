import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { WebSocketService } from '../service/websocket.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  readings: any = '----';
  temp: any;
  isadmin = false;
  isMenuVisible = false;
  private readingSubscription: Subscription | undefined;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private route: Router, private webSocketService: WebSocketService) {
    let role = sessionStorage.getItem('role');
    if (role == 'admin') {
      this.isadmin = true;
    }
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  logout() {
    // Implement your logout logic here
  }

  ngOnInit(): void {
    this.startFetching();
  }

  ngOnDestroy(): void {
    this.stopFetching();
  }

  private startFetching(): void {
    this.readingSubscription = interval(10000)
      .pipe(
        switchMap(() => this.webSocketService.getReadings())
      )
      .subscribe({
        next: (data: any) => {
          try {
            this.readings = data || 'NULL';
          } catch (error) {
            console.error('Error parsing JSON:', error);
            this.readings = 'NULL';
          }
        },
        error: (error) => {
          console.error('Error fetching readings:', error);
          this.readings = 'NULL';
        }
      });
  }

  private stopFetching(): void {
    this.readingSubscription?.unsubscribe();
  }

  ngDoCheck(): void {
    let currentroute = this.route.url;
    let role = sessionStorage.getItem('role');
    if (currentroute == '/login' || currentroute == '/register') {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }

    if (role == 'admin') {
      this.isadmin = true;
      this.route.navigate(['user']);
    } else {
      this.isadmin = false;
    }
  }

  saveReadings() {
    this.temp = this.readings;
    console.log("readings in dashboard", this.temp);

    if (!this.temp || this.temp === 'NULL') {
      console.error('Error: Readings data is not available.');
      return;
    }
    this.webSocketService.saveReadings(this.temp).subscribe({
      next: () => {
        console.log('Readings saved successfully.');
      },
      error: (error) => {
        console.error('Error in saving readings:', error);
      }
    });
  }
}

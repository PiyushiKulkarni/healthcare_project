import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements DoCheck{
    title = 'HealthCare Monitoring';
    isadmin=false;
    isMenuVisible=false;
    constructor(private route:Router){
      let role=sessionStorage.getItem('role');
      if(role=='admin'){
        this.isadmin=true;
      }
    }
    ngDoCheck(): void {
      let currentroute = this.route.url;
      let role=sessionStorage.getItem('role');
      if (currentroute == '/login' || currentroute == '/register') {
        this.isMenuVisible = false
      } else {
        this.isMenuVisible = true
      }
  
      if (role == 'admin') {
        this.isadmin = true;
      }else{
        this.isadmin = false;
      }
    }
  }
  


import { Component } from '@angular/core';
// import {MatSidenav} from '@angular/material/sidenav';
// import {MatListItem} from '@angular/material/list';
// import {MatNavList} from '@angular/material/list';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar-dashboard.component.html',
  styleUrls: ['./sidebar-dashboard.component.css']
})
export class SidebarDashboardComponent {
  constructor() {}

  checkParameter(parameter: string) {
    // Simulate fetching data or making an API call
    switch (parameter) {
      case 'BPM':
        this.bpmValue = '80 BPM';
        break;
      case 'SpO2':
        this.spo2Value = '98%';
        break;
      case 'Room Temp':
        this.roomTempValue = '22.5°C';
        break;
      case 'ECG':
        this.ecgValue = 'Normal';
        break;
      case 'Body Temp':
        this.bodyTempValue = '37.2°C';
        break;
      default:
        break;
    }
  }

  // Declare properties for parameter values
  bpmValue!: '80 BPM';
  spo2Value!: '98%';
  roomTempValue!: '22.5°C';
  ecgValue!: 'Normal';
  bodyTempValue!: '37.2°C';
// }
}

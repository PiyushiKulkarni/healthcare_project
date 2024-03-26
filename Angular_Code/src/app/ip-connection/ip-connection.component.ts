import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-ip-connection',
  templateUrl: './ip-connection.component.html',
  styleUrls: ['./ip-connection.component.css']
})
export class IPConnectionComponent {
  ipAddress: string = '';
  portNumber!: number;
  constructor(private builder: FormBuilder, private router: Router,
    private toastr: ToastrService) {

  }
  connect() {
    // Implement your connection logic here.
    // You can use this.ipAddress and this.portNumber to establish the connection.
    // For example, you can send an HTTP request or use a WebSocket connection.
    this.toastr.success('','Connection successful')
    this.router.navigate(['dashboard'])
  }
  isFormValid() {
    // Check if the form is valid
    return !!this.ipAddress && this.portNumber > 0;
  }
}
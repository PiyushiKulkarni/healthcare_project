import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar'
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl:'./user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit {

  constructor(private builder: FormBuilder, private service: AuthService,private toastr: ToastrService, private dialog: MatDialog,private router: Router) {
    
    this.LoadUser();
  }
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  accessdata: any;
  havedelete = false;
  ngAfterViewInit(): void {

  }
  LoadUser() {
    this.service.Getall().subscribe((res: any) => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // SetAccesspermission() {
  //   this.service.Getaccessbyrole(this.service.getrole(), 'admin').subscribe(res => {
  //     this.accessdata = res;
  //     //console.log(this.accessdata);

  //     if(this.accessdata.length>0){
        
  //       this.havedelete=this.accessdata[0].havedelete;
  //       this.LoadUser();
  //     }else{
  //       alert('you are not authorized to access.');
  //       this.router.navigate(['']);
  //     }

  //   });
  // }
  displayedColumns: string[] = ['username', 'name', 'email', 'status', 'role', 'action'];

  updateuser(code: any) {
    this.OpenDialog('400ms', '600ms', code);
  }
  removeuser(code: any) {
    this.service.Getaccessbyrole(this.service.getrole(), 'user').subscribe(res => {
        this.accessdata = res;
        if (this.accessdata.length > 0) {
            this.havedelete = this.accessdata[0].havedelete;
            if (this.havedelete) {
                this.service.removeUser(code).subscribe((result: any) => {
                    if (result.success) {
                        const index = this.dataSource.data.findIndex((user: any) => user.id === code);
                        if (index !== -1) {
                            this.dataSource.data.splice(index, 1);
                            // Update local storage
                            localStorage.setItem('userList', JSON.stringify(this.dataSource.data));
                            this.dataSource = new MatTableDataSource(this.dataSource.data);
                            this.dataSource.paginator = this.paginator;
                            this.dataSource.sort = this.sort;
                            this.toastr.success('User removed successfully.');
                        } else {
                            this.toastr.error('User not found.');
                        }
                    } else {
                        this.toastr.error('Failed to delete user: ' + result.message);
                    }
                }, error => {
                    this.toastr.error('Failed to delete user: ' + error.message);
                });
            } else {
                this.toastr.warning('You do not have access to delete.');
            }
        } else {
            alert('You are not authorized to access.');
            this.router.navigate(['']);
        }
    });
}





  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }
   
}

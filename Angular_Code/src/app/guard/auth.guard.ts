// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Observable } from 'rxjs';
// import { AuthService } from '../service/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// // @Injectable()
// // class PermissionServices{
// //   canActivate(currentUser: UserToken, userID: string): boolean{
// //     return true;
// //   }
// //   canMatch(currentUser:UserToken):boolean{
// //     return true;
// //   }
// // }

// export class AuthGuard implements CanActivate {
//   constructor(private service: AuthService, private router: Router,private tostr:ToastrService) { }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
//     if (this.service.isloggedin()) {
//       if (route.url.length > 0) {
//         let menu = route.url[0].path;
//         if (menu == 'user') {
//           if (this.service.getrole() == 'admin') {
//             return true;
//           } else {
//             this.router.navigate(['']);
//               this.tostr.warning('You dont have access.')
//             return false;
//           }
//         }else{
//           return true;
//         }
//       } else {
//         return true;
//       }
//     }
//     else {
//       this.router.navigate(['login']);
//       return false;
//     }
//   }

// }
// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Observable } from 'rxjs';
// import { AuthService } from '../service/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivateFn {
//   constructor(private service: AuthService, private router: Router, private tostr: ToastrService) { }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

//     const canActivateFn: CanActivateFn = (childRoute, _state) => {
//       if (this.service.isloggedin()) {
//         if (childRoute.url.length > 0) {
//           let menu = childRoute.url[0].path;
//           if (menu == 'user') {
//             if (this.service.getrole() == 'admin') {
//               return true;
//             } else {
//               this.router.navigate(['']);
//               this.tostr.warning('You dont have access.');
//               return false;
//             }
//           } else {
//             return true;
//           }
//         } else {
//           return true;
//         }
//       } else {
//         this.router.navigate(['login']);
//         return false;
//       }
//     };

//     return canActivateFn(route, state);
//   }
// }




import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private service: AuthService, private router: Router, private tostr: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.service.isloggedin()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu == 'user') {
          if (this.service.getrole() == 'admin') {
            return true;
          } else {
            this.router.navigate(['']);
            this.tostr.warning('You dont have access.');
            return false;
          }
        } else {
          return true;
        }
      } else {
        return true;
      }
    } else {
      this.router.navigate(['homepage']);
      return false;
    }
  }
}

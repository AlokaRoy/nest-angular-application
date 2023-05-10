import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  isLoggedIn: boolean = false;
  isSignedUp: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.action$.subscribe(action => {
      if (action === 'signup complete') {
        this.isSignedUp = true;
      } else if (action === 'login complete') {
        this.isLoggedIn = true;
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
    // this.hasSignedUp();
    // this.hasLoggedIn();
  //   this.authService.checkIfSignedUp().subscribe({
  //     next: (response) => {
  //       this.isSignedUp = true;
  //     },
  //     error: (error) => {
  //     }
  // });
    //this.isLoggedIn = this.authService.getToken();
  }

  // hasSignedUp(): Boolean {
  //   var res = false;
  //   this.authService.checkIfSignedUp().subscribe({
  //     next: (response) => {
  //       res = true;
  //     },
  //     error: (error) => {
  //     }
  // });
  // return res;
  // }

  // hasLoggedIn(): Boolean {
  //   return this.authService.getToken();
  // }}

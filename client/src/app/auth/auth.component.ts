import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  username: string = "";
  password: string = "";
  isLoggingIn: boolean = false;
  canLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.logout();
    this.authService.checkIfSignedUp().subscribe({
      next: (response) => {
        this.canLogin = response;
        this.authService.emitAction('signup complete');
      },
      error: (error) => {
        console.log(error);
      }
  });
  }

  onSubmit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this.isLoggingIn = true;
    this.authService.signUp(username, password).subscribe({
      next: (response) => {
        this.isLoggingIn = false;
        form.reset();
        alert('You have successfully signed up. Please login to continue.');
        this.canLogin = true;
        this.authService.emitAction('signup complete');
      },
      error: (error) => {
        console.log(error);
        this.isLoggingIn = false;
      }
  });
  }

  onLogin() {
    this.isLoggingIn = true;
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.isLoggingIn = false;
        alert('You have successfully logged in.');
        this.authService.emitAction('login complete');
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.log(error);
        this.isLoggingIn = false;
        alert('Invalid username or password.');
      }
    });
  }

}

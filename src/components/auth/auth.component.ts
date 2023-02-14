import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.component.scss'],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  viewType = 'login';
  email: string | null = null;
  password: string | null = null;
  s_email: string | null = null;
  s_password: string | null = null;
  s_cpassword: string | null = null;
  constructor(
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() { }

  resetInputs() {
    this.email = null;
    this.password = null;
    this.s_email = null;
    this.s_password = null;
    this.s_cpassword = null;
  }

  login() {
    if (!(this.email && this.password)) {
      this._snackBar.open('Please fill all required fields', 'close', { duration: 2000 });
      return;
    }

    this.apiService.login({
      email: this.email,
      password: this.password,
    }).pipe(
      catchError((err) => {
        this._snackBar.open(err.error.message, 'close', { duration: 2000 });
        return of({});
      })
    ).subscribe(() => {
      this.resetInputs();
      this.router.navigate(['bhaai']);
    });
  }

  signup() {
    if (!(this.s_email && this.s_password && this.s_cpassword)) {
      this._snackBar.open('Please fill all required fields', 'close', { duration: 2000 });
      return;
    }

    this.apiService.signup({
      email: this.s_email,
      password: this.s_password,
    }).pipe(
      catchError((err) => {
        this._snackBar.open(err.error.message, 'close', { duration: 2000 });
        return of({});
      })
    ).subscribe(() => {
      this.resetInputs();
      this.viewType = 'login';
    });
  }
}
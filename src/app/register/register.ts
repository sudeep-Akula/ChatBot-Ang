import { Component ,ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  appBaseUrl = environment.apiBaseUrl;
    username = '';
  email = '';
  mobile = '';
  password = '';

  loading = false;
  errorMsg = '';
  successMsg = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  register() {
    if (!this.username || !this.email || !this.mobile || !this.password) {
      this.errorMsg = 'All fields are required';
      return;
    }

    const payload = {
      username: this.username,
      email: this.email,
      mobile: this.mobile,
      password: this.password
    };

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.http.post<any>(
      `${this.appBaseUrl}/user/register`,
      payload
    ).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.message === 'Registered Successfully') {
          // alert("Registered Successfully! Please Login.");
          this.errorMsg = ''; 
          this.successMsg = 'Registration successful! Redirecting...';
          
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 100);
        } else {
          this.errorMsg = res.message || 'Registration failed';
        }
        this.cd.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Registration failed. Try again.';
        this.cd.detectChanges();
      }
    });


    // this.http.post<any>('path',payload).subscribe({
    //   next:(response)=>{},
    //   error:(error)=>{}

    // });

    // this.http.post<any>('',payload).subscribe({
    //   next:(response)=>{},
    //   error:(error)=>{}
    // });

    // this.http.post<any>('',payload).subscribe({
    //   next:response=>{},
    //   error:error=>{}
    // });
  }
}

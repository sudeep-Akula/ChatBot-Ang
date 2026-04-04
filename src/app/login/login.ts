import { Component ,ChangeDetectorRef} from '@angular/core';
import { environment } from '../environments/environment';
import { Auth } from '../auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true, // ✅ standalone component
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})


export class Login {
  
  appBaseUrl = environment.apiBaseUrl;

  username = '';
  otp = '';

  otpSent = false;
  loading = false;
  errorMsg = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: Auth,
    private cd: ChangeDetectorRef
  ) {}

  sendOtp(): void {
    if (!this.username.trim()) {
      this.errorMsg = 'Username is required';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    // no api requried to send otp as per backend implementation, but we will call the api to set the otpSent flag to true and show the otp input field
    this.otpSent = true;
    this.loading = false;
    this.cd.detectChanges();
    
    // this is just to simulate the otp sending process and set the otpSent flag to true, you can remove this api call if not needed
    // this.http.get<any>(`${this.appBaseUrl}/user/requestOtp/${this.username}`)
    //   .subscribe({
    //     next: (res) => {
    //       if (res.status === 'success') {
    //         this.otpSent = true;
    //         console.log('OTP sent successfully');
    //         console.log('Backend response:', res);
    //         console.log('otpSent flag:', this.otpSent);
    //       } else {
    //         this.errorMsg = res.message || 'Failed to send OTP';
    //       }
    //       this.loading = false;
    //       this.cd.detectChanges();
    //     },
    //     error: (err) => {
    //       console.error('Error sending OTP:', err);
    //       this.errorMsg = 'Error sending OTP';
    //       this.loading = false;
    //       this.cd.detectChanges();
    //     }
    //   });

      // this.http.get<any>(path).subscribe({
      //   next: (res) => {},
      //   error:(err) =>{}
      // });
  }

  verifyOtp(): void {
   

    this.loading = true;

    this.errorMsg = '';

    // simulate OTP verification by calling the backend API to verify the OTP and get the auth token

      localStorage.setItem('authToken', '');
      localStorage.setItem('username', this.username);
      this.auth.setAuthData('', this.username);
      this.router.navigate(['/users']);

    // In a real application, you would call the backend API to verify the OTP and get the auth token, but here we will just simulate the process by checking if the OTP is '123456' and then setting a dummy auth token in local storage and navigating to the dashboard page

    // this.http.post<any>(`${this.appBaseUrl}/user/verifyOtp`, { username: this.username , otp: this.otp })
    //   .subscribe({
    //     next: (res) => {
    //       if (res.status === 'success') {
    //         localStorage.setItem('authToken', res.token);
    //         localStorage.setItem('username', this.username);
    //         this.auth.setAuthData(res.token, this.username);
    //         this.router.navigate(['/dashboard']);
    //       } else {
    //         this.errorMsg = res.message || 'Login failed';
    //       }
    //       this.loading = false;
    //     },
    //     error: (err) => {
    //       console.error('Login error:', err);
    //       this.errorMsg = 'Login failed';
    //       this.loading = false;
    //     }
    //   });
  }
}

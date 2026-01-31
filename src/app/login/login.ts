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

    this.http.get<any>(`${this.appBaseUrl}/user/requestOtp/${this.username}`)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.otpSent = true;
            console.log('OTP sent successfully');
            console.log('Backend response:', res);
            console.log('otpSent flag:', this.otpSent);
            

          } else {
            this.errorMsg = res.message || 'Failed to send OTP';
          }
          this.loading = false;
          this.cd.detectChanges();
        },
        error: (err) => {
          console.error('Error sending OTP:', err);
          this.errorMsg = 'Error sending OTP';
          this.loading = false;
          this.cd.detectChanges();
        }
      });
  }

  verifyOtp(): void {
   

    this.loading = true;

    this.errorMsg = '';

    this.http.post<any>(`${this.appBaseUrl}/user/verifyOtp`, { username: this.username , otp: this.otp })
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            localStorage.setItem('authToken', res.token);
            localStorage.setItem('username', this.username);
            this.auth.setAuthData(res.token, this.username);
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMsg = res.message || 'Login failed';
          }
          this.loading = false;
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMsg = 'Login failed';
          this.loading = false;
        }
      });
  }
}

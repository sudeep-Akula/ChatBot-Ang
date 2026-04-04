import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { Auth } from '../auth';

@Component({
  selector: 'app-users',
  standalone: true,                // 👈 mark as standalone
  imports: [CommonModule],         // 👈 import CommonModule for *ngFor, *ngIf
  templateUrl: './users.html',
  styleUrls: ['./users.css']       // 👈 corrected to styleUrls (plural)
})
export class Users {
  users: any[] = [];               // 👈 store fetched users here

  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: Auth,
    private cd: ChangeDetectorRef
  ) {}

  getUsers(): void {
    this.http.get<any[]>(`${environment.apiBaseUrl}/bot/bot/getdata`)
      .subscribe({
        next: (res) => {
          console.log('Users data:', res);
          this.users = res;        // 👈 assign response to users array
          this.cd.detectChanges(); // 👈 trigger change detection if needed
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });
  }

  ngOnInit(): void {
    this.getUsers();               // 👈 fetch users when component loads
  }
}

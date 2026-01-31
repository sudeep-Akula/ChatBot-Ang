import { Injectable ,inject,PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private token: string | null = null; 
  private username: string | null = null;
  private isBrowser: boolean;

  constructor() {
    const platformId = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);
     if (this.isBrowser) {
      this.token = localStorage.getItem('authToken');
      this.username = localStorage.getItem('username');
    }
    // this.token = localStorage.getItem('authToken');
    // this.username = localStorage.getItem('username');
  }

  setAuthData(token: string, username: string) { 
    this.token = token;
     this.username = username;
      if (this.isBrowser) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('username', username);
    }
    //  localStorage.setItem('authToken', token);
    //  localStorage.setItem('username', username);
     }

    getToken(): string | null {
        return this.token; 
      }

    getUsername(): string | null { 
    return this.username;
    }

    logout() {
    this.token = null;
    this.username = null;
    localStorage.clear();
  }
}


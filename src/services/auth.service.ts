import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);
  
  // Mock login
  login(user: Omit<User, 'id'>) {
    const newUser: User = { ...user, id: `user-${Date.now()}` };
    this.currentUser.set(newUser);
  }

  logout() {
    this.currentUser.set(null);
  }
}

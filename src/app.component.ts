import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  appService = inject(AppService);
  authService = inject(AuthService);
  router = inject(Router);

  searchTerm = this.appService.searchTerm;
  currentUser = this.authService.currentUser;
  isPublisher = computed(() => this.currentUser()?.type === 'publisher');

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.appService.searchTerm.set(input.value);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
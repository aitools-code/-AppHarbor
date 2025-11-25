import { Component, ChangeDetectionStrategy, Signal, computed, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppService } from '../../services/app.service';
import { App } from '../../models/app.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './app-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private appService = inject(AppService);
  private authService = inject(AuthService);
  private location = inject(Location);

  app: Signal<App | undefined> = computed(() => {
    const appId = this.route.snapshot.paramMap.get('id');
    if (!appId) return undefined;
    return this.appService.getAppById(+appId);
  });
  
  currentUser = this.authService.currentUser;

  isDescriptionExpanded = signal(false);

  // Screenshot lightbox state
  lightboxOpen = signal(false);
  selectedScreenshotIndex = signal(0);

  toggleDescription() {
    this.isDescriptionExpanded.update(value => !value);
  }

  handleDownload(): void {
    if (this.currentUser()) {
      // In a real app, this would trigger a download.
      alert(`Downloading ${this.app()?.name}...`);
    } else {
      // Redirect to login, passing a return url
      this.router.navigate(['/auth'], { queryParams: { returnUrl: this.location.path() } });
    }
  }

  openLightbox(index: number): void {
    this.selectedScreenshotIndex.set(index);
    this.lightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  nextScreenshot(): void {
    const app = this.app();
    if (app && app.screenshots) {
      this.selectedScreenshotIndex.update(i => (i + 1) % app.screenshots.length);
    }
  }

  prevScreenshot(): void {
    const app = this.app();
    if (app && app.screenshots) {
      this.selectedScreenshotIndex.update(i => (i - 1 + app.screenshots.length) % app.screenshots.length);
    }
  }
}

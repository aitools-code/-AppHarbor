import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../services/auth.service';
import { App } from '../../models/app.model';

@Component({
  selector: 'app-publish-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './publish-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublishAppComponent {
  private fb = inject(FormBuilder);
  private appService = inject(AppService);
  private authService = inject(AuthService);
  private router = inject(Router);

  categories = this.appService.getCategories()().filter(c => c !== 'All');
  currentUser = this.authService.currentUser;

  iconPreview = signal<string | null>(null);
  screenshotPreviews = signal<string[]>([]);
  screenshotError = signal<string | null>(null);

  publishForm = this.fb.group({
    name: ['', Validators.required],
    developer: ['', Validators.required],
    category: [this.categories[0], Validators.required],
    platform: ['Mobile' as App['platform'], Validators.required],
    description: ['', [Validators.required, Validators.minLength(50)]],
    iconUrl: ['', Validators.required],
    screenshots: [[] as string[], [Validators.required, Validators.minLength(1)]],
  });

  onIconSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        this.iconPreview.set(result);
        this.publishForm.patchValue({ iconUrl: result });
      };
      reader.readAsDataURL(file);
    }
  }

  onScreenshotsSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.screenshotError.set(null);
      this.screenshotPreviews.set([]);
      let files = Array.from(input.files);

      if (files.length > 10) {
        this.screenshotError.set('You can only upload a maximum of 10 screenshots. The first 10 have been selected.');
        files = files.slice(0, 10);
      }

      const promises = files.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then(results => {
        this.screenshotPreviews.set(results);
        this.publishForm.patchValue({ screenshots: results });
      }).catch(err => console.error("Error reading screenshots", err));
    }
  }


  onSubmit(): void {
    const publisher = this.currentUser();
    if (this.publishForm.valid && publisher) {
      const newApp = this.appService.addApp(
        this.publishForm.getRawValue() as Omit<App, 'id' | 'rating' | 'downloads' | 'publisherId'>,
        publisher.id
      );
      // Redirect to the new app's detail page
      this.router.navigate(['/app', newApp.id]);
    } else {
      alert('Please fill out the form completely. Description must be at least 50 characters, and you must upload an icon and at least one screenshot.');
    }
  }
}
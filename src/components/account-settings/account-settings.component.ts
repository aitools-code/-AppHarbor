import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './account-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountSettingsComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  currentUser = this.authService.currentUser;

  settingsForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    const user = this.currentUser();
    if (user) {
      this.settingsForm.patchValue({
        name: user.name,
        email: user.email,
      });
    }
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      console.log('Updated user info:', this.settingsForm.getRawValue());
      // In a real app, you would call a service to update the user data
      alert('Your settings have been updated!');
    }
  }
}
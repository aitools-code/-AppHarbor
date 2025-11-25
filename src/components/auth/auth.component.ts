import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  accountType = signal<'user' | 'publisher'>('user');

  userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  
  publisherForm = this.fb.group({
    developerName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  setAccountType(type: 'user' | 'publisher') {
    this.accountType.set(type);
  }

  onSubmit(): void {
    const type = this.accountType();
    const form = type === 'user' ? this.userForm : this.publisherForm;

    if (form.valid) {
      const formValue = form.getRawValue();
      const userToCreate: Omit<User, 'id'> = {
        name: type === 'user' ? formValue.name! : formValue.developerName!,
        email: formValue.email!,
        type: type,
      };

      this.authService.login(userToCreate);
      
      const returnUrl = this.route.snapshot.queryParams['returnUrl'];
      if (returnUrl) {
        this.router.navigateByUrl(returnUrl);
      } else {
        // After signup, redirect to the relevant dashboard
        if (userToCreate.type === 'publisher') {
          this.router.navigate(['/publisher-dashboard']);
        } else { // 'user'
          this.router.navigate(['/user-dashboard']);
        }
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }
}
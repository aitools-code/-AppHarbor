import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AppService } from '../../services/app.service';
import { RouterLink } from '@angular/router';
import { AppCardComponent } from '../app-card/app-card.component';
import { App } from '../../models/app.model';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-publisher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, AppCardComponent, ReactiveFormsModule],
  templateUrl: './publisher-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublisherDashboardComponent {
  authService = inject(AuthService);
  appService = inject(AppService);
  private fb = inject(FormBuilder);

  currentUser = this.authService.currentUser;

  // Mock data for earnings and payouts
  currentBalance = signal(1234.56);
  transactions = signal([
    { id: 1, date: '2024-07-20', description: 'Monthly Payout', amount: -500.00, type: 'payout' as const },
    { id: 2, date: '2024-07-15', description: 'Revenue from "Super App"', amount: 25.50, type: 'earning' as const },
    { id: 3, date: '2024-07-10', description: 'Revenue from "Mega Tool"', amount: 15.75, type: 'earning' as const },
    { id: 4, date: '2024-06-20', description: 'Monthly Payout', amount: -450.00, type: 'payout' as const },
  ]);

  bankDetailsForm = this.fb.group({
    bankName: ['Global Bank Inc.', Validators.required],
    accountHolder: [this.currentUser()?.name || '', Validators.required],
    accountNumber: ['**** **** **** 1234', [Validators.required, Validators.pattern('^[0-9* ]*$')]]
  });

  publisherApps = computed<App[]>(() => {
    const user = this.currentUser();
    if (user?.type !== 'publisher') {
      return [];
    }
    return this.appService.getApps()().filter(app => app.publisherId === user.id);
  });

  handlePayoutSubmit(): void {
    if (this.bankDetailsForm.valid) {
      console.log('Bank details updated:', this.bankDetailsForm.getRawValue());
      alert('Your payout information has been updated successfully!');
    }
  }
}
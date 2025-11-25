import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { App } from '../../models/app.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="group relative flex items-center w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-200 transition-all duration-300 p-3 gap-4">
      <div class="flex-shrink-0">
        <img [src]="app().iconUrl" [alt]="app().name" width="64" height="64" class="rounded-lg object-cover">
      </div>
      <div class="flex-grow min-w-0">
        <h3 class="text-md font-bold text-slate-800 truncate">{{ app().name }}</h3>
        <p class="text-sm text-slate-500 truncate">{{ app().developer }}</p>
        <div class="flex items-center text-xs text-slate-500 mt-1">
            <i class="fa-solid fa-star text-yellow-400"></i>
            <span class="ml-1 font-semibold">{{ app().rating }}</span>
            <span class="mx-2">·</span>
            <i class="fa-solid fa-download"></i>
            <span class="ml-1">{{ app().downloads }}</span>
        </div>
      </div>
      <div class="flex-shrink-0 ml-4">
         <a [routerLink]="['/app', app().id]" class="w-full block text-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 text-sm">
          Details
        </a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCardComponent {
  app = input.required<App>();
}
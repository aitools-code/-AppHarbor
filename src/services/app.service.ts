import { Injectable, signal } from '@angular/core';
import { App } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private mockApps: App[] = [];

  private categories = [
    'All', 'Productivity', 'Games', 'Utilities', 'Developer Tools', 'Social', 'Creativity'
  ];

  private appsSignal = signal<App[]>(this.mockApps);
  private categoriesSignal = signal<string[]>(this.categories);

  searchTerm = signal<string>('');
  selectedCategory = signal<string>('All');

  getApps() {
    return this.appsSignal.asReadonly();
  }

  getCategories() {
    return this.categoriesSignal.asReadonly();
  }

  getAppById(id: number) {
    return this.appsSignal().find(app => app.id === id);
  }

  addApp(appData: Omit<App, 'id' | 'rating' | 'downloads' | 'publisherId'>, publisherId: string) {
    const newId = this.appsSignal().length > 0 ? Math.max(...this.appsSignal().map(a => a.id)) + 1 : 1;
    const newApp: App = {
      ...appData,
      id: newId,
      rating: 0, // New apps start with 0 rating
      downloads: '0',
      publisherId: publisherId,
    };

    this.appsSignal.update(apps => [...apps, newApp]);
    return newApp;
  }
}
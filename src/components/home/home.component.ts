import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCardComponent } from '../app-card/app-card.component';
import { AppService } from '../../services/app.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AppCardComponent, RouterLink],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  appService = inject(AppService);

  apps = this.appService.getApps();
  categories = this.appService.getCategories();
  
  searchTerm = this.appService.searchTerm;
  selectedCategory = this.appService.selectedCategory;
  
  filteredApps = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();

    return this.apps()
      .filter(app => {
        const matchesCategory = category === 'All' || app.category === category;
        const matchesSearch = app.name.toLowerCase().includes(term) || app.description.toLowerCase().includes(term);
        return matchesCategory && matchesSearch;
    });
  });

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
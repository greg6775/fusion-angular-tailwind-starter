import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { BadgeComponent } from '../badge/badge.component';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  type?: 'text' | 'number' | 'date' | 'status' | 'currency' | 'custom';
  customTemplate?: string;
}

export interface TableAction {
  label: string;
  icon?: string;
  action: (item: any) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  disabled?: (item: any) => boolean;
}

export interface SortState {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent, BadgeComponent],
  template: `
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <!-- Table Header -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div>
            <h3 *ngIf="title" class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ title }}</h3>
            <p *ngIf="subtitle" class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ subtitle }}</p>
          </div>
          
          <div class="flex items-center gap-4">
            <!-- Search -->
            <div *ngIf="searchable" class="relative">
              <app-input
                placeholder="Search..."
                [value]="searchTerm"
                (inputChange)="onSearch($event)"
                class="w-64"
              >
                <svg slot="prefix-icon" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </app-input>
            </div>

            <!-- Actions -->
            <div *ngIf="headerActions.length > 0" class="flex items-center gap-2">
              <app-button
                *ngFor="let action of headerActions"
                [variant]="action.variant || 'secondary'"
                [size]="'sm'"
                (click)="action.action()"
              >
                <svg *ngIf="action.icon" slot="icon-left" class="w-4 h-4" [innerHTML]="getIcon(action.icon)"></svg>
                {{ action.label }}
              </app-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th *ngIf="selectable" class="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  [checked]="allSelected"
                  [indeterminate]="someSelected"
                  (change)="toggleSelectAll()"
                  class="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                />
              </th>
              <th
                *ngFor="let column of columns"
                [style.width]="column.width"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                [class.cursor-pointer]="column.sortable"
                (click)="column.sortable ? toggleSort(column.key) : null"
              >
                <div class="flex items-center gap-2">
                  <span>{{ column.label }}</span>
                  <div *ngIf="column.sortable" class="flex flex-col">
                    <svg
                      class="w-3 h-3"
                      [class.text-primary-600]="sortState?.column === column.key && sortState?.direction === 'asc'"
                      [class.text-gray-300]="!(sortState?.column === column.key && sortState?.direction === 'asc')"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                    </svg>
                    <svg
                      class="w-3 h-3 -mt-1"
                      [class.text-primary-600]="sortState?.column === column.key && sortState?.direction === 'desc'"
                      [class.text-gray-300]="!(sortState?.column === column.key && sortState?.direction === 'desc')"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </th>
              <th *ngIf="rowActions.length > 0" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr *ngIf="loading" class="animate-pulse">
              <td [attr.colspan]="totalColumns" class="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                <div class="flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </div>
              </td>
            </tr>
            
            <tr *ngIf="!loading && paginatedData.length === 0">
              <td [attr.colspan]="totalColumns" class="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                <div class="flex flex-col items-center">
                  <svg class="w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-5a2 2 0 00-2 2v1a2 2 0 01-2 2H9a2 2 0 01-2-2v-1a2 2 0 00-2-2H0" />
                  </svg>
                  <p class="text-lg font-medium">{{ emptyMessage || 'No data available' }}</p>
                  <p class="text-sm mt-1">{{ emptySubMessage || 'Get started by adding some data.' }}</p>
                </div>
              </td>
            </tr>

            <tr 
              *ngFor="let item of paginatedData; trackBy: trackByFn"
              class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
              [class.bg-primary-50]="isSelected(item)"
              [class.dark:bg-primary-900/20]="isSelected(item)"
            >
              <td *ngIf="selectable" class="px-6 py-4">
                <input
                  type="checkbox"
                  [checked]="isSelected(item)"
                  (change)="toggleSelectItem(item)"
                  class="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                />
              </td>
              
              <td *ngFor="let column of columns" class="px-6 py-4 whitespace-nowrap">
                <div [ngSwitch]="column.type || 'text'">
                  <!-- Text -->
                  <span *ngSwitchCase="'text'" class="text-sm text-gray-900 dark:text-gray-100">
                    {{ getNestedProperty(item, column.key) }}
                  </span>
                  
                  <!-- Number -->
                  <span *ngSwitchCase="'number'" class="text-sm text-gray-900 dark:text-gray-100 font-mono">
                    {{ getNestedProperty(item, column.key) | number }}
                  </span>
                  
                  <!-- Currency -->
                  <span *ngSwitchCase="'currency'" class="text-sm text-gray-900 dark:text-gray-100 font-mono">
                    {{ getNestedProperty(item, column.key) | currency }}
                  </span>
                  
                  <!-- Date -->
                  <span *ngSwitchCase="'date'" class="text-sm text-gray-900 dark:text-gray-100">
                    {{ getNestedProperty(item, column.key) | date:'medium' }}
                  </span>
                  
                  <!-- Status -->
                  <app-badge 
                    *ngSwitchCase="'status'"
                    [variant]="getStatusVariant(getNestedProperty(item, column.key))"
                    size="sm"
                  >
                    {{ getNestedProperty(item, column.key) }}
                  </app-badge>
                  
                  <!-- Custom -->
                  <div *ngSwitchCase="'custom'">
                    <ng-content [select]="'[slot=' + column.customTemplate + ']'"></ng-content>
                  </div>
                </div>
              </td>
              
              <td *ngIf="rowActions.length > 0" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end gap-2">
                  <app-button
                    *ngFor="let action of rowActions"
                    [variant]="action.variant || 'ghost'"
                    size="sm"
                    [disabled]="action.disabled ? action.disabled(item) : false"
                    (click)="action.action(item)"
                  >
                    <svg *ngIf="action.icon" class="w-4 h-4" [innerHTML]="getIcon(action.icon)"></svg>
                    {{ action.label }}
                  </app-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div *ngIf="paginated && !loading && paginatedData.length > 0" class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500 dark:text-gray-400">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalItems }} results
          </div>
          
          <div class="flex items-center gap-2">
            <app-button
              variant="ghost"
              size="sm"
              [disabled]="currentPage === 1"
              (click)="goToPage(currentPage - 1)"
            >
              Previous
            </app-button>
            
            <div class="flex items-center gap-1">
              <app-button
                *ngFor="let page of visiblePages"
                [variant]="page === currentPage ? 'primary' : 'ghost'"
                size="sm"
                (click)="goToPage(page)"
              >
                {{ page }}
              </app-button>
            </div>
            
            <app-button
              variant="ghost"
              size="sm"
              [disabled]="currentPage === totalPages"
              (click)="goToPage(currentPage + 1)"
            >
              Next
            </app-button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DataTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() title = '';
  @Input() subtitle = '';
  @Input() loading = false;
  @Input() searchable = true;
  @Input() selectable = false;
  @Input() paginated = true;
  @Input() pageSize = 10;
  @Input() emptyMessage = '';
  @Input() emptySubMessage = '';
  @Input() headerActions: TableAction[] = [];
  @Input() rowActions: TableAction[] = [];

  @Output() searchChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<SortState>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() pageChange = new EventEmitter<number>();

  searchTerm = '';
  sortState: SortState | null = null;
  selectedItems = new Set<any>();
  currentPage = 1;

  ngOnInit() {
    // Initialize component
  }

  get filteredData(): any[] {
    let filtered = [...this.data];
    
    // Apply search filter
    if (this.searchTerm) {
      filtered = filtered.filter(item => 
        this.columns.some(column => {
          const value = this.getNestedProperty(item, column.key);
          return value && value.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
        })
      );
    }
    
    // Apply sorting
    if (this.sortState) {
      filtered.sort((a, b) => {
        const aValue = this.getNestedProperty(a, this.sortState!.column);
        const bValue = this.getNestedProperty(b, this.sortState!.column);
        
        if (aValue < bValue) return this.sortState!.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortState!.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return filtered;
  }

  get paginatedData(): any[] {
    if (!this.paginated) return this.filteredData;
    
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredData.slice(startIndex, endIndex);
  }

  get totalItems(): number {
    return this.filteredData.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.totalItems);
  }

  get visiblePages(): number[] {
    const pages = [];
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);
    
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  get totalColumns(): number {
    let count = this.columns.length;
    if (this.selectable) count++;
    if (this.rowActions.length > 0) count++;
    return count;
  }

  get allSelected(): boolean {
    return this.paginatedData.length > 0 && this.paginatedData.every(item => this.selectedItems.has(item));
  }

  get someSelected(): boolean {
    return this.paginatedData.some(item => this.selectedItems.has(item)) && !this.allSelected;
  }

  getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  getStatusVariant(status: string): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' {
    const statusMap: { [key: string]: any } = {
      'published': 'success',
      'draft': 'warning',
      'pending': 'info',
      'rejected': 'error',
      'active': 'success',
      'inactive': 'secondary',
      'completed': 'success',
      'processing': 'info',
      'failed': 'error'
    };
    
    return statusMap[status?.toLowerCase()] || 'default';
  }

  getIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      edit: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />',
      delete: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />',
      view: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />',
      download: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />',
      plus: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />',
      filter: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />',
    };
    
    return `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor">${icons[iconName] || ''}</svg>`;
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.searchChange.emit(term);
  }

  toggleSort(columnKey: string): void {
    if (this.sortState?.column === columnKey) {
      this.sortState.direction = this.sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortState = { column: columnKey, direction: 'asc' };
    }
    this.sortChange.emit(this.sortState);
  }

  toggleSelectAll(): void {
    if (this.allSelected) {
      this.paginatedData.forEach(item => this.selectedItems.delete(item));
    } else {
      this.paginatedData.forEach(item => this.selectedItems.add(item));
    }
    this.selectionChange.emit(Array.from(this.selectedItems));
  }

  toggleSelectItem(item: any): void {
    if (this.selectedItems.has(item)) {
      this.selectedItems.delete(item);
    } else {
      this.selectedItems.add(item);
    }
    this.selectionChange.emit(Array.from(this.selectedItems));
  }

  isSelected(item: any): boolean {
    return this.selectedItems.has(item);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(page);
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}

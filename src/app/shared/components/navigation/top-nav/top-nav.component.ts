import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from '../../button/button.component';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <nav class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div class="container-max">
        <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <!-- Logo and Brand -->
          <div class="flex items-center gap-8">
            <a [routerLink]="'/'" class="flex items-center gap-3">
              <div class="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900 dark:text-gray-100">
                BBN Music
              </span>
            </a>

            <!-- Desktop Navigation Links -->
            <div *ngIf="showNavLinks" class="hidden md:flex items-center gap-6">
              <a 
                routerLink="/features" 
                routerLinkActive="text-primary-600 dark:text-primary-400"
                class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors duration-200"
              >
                Features
              </a>
              <a 
                routerLink="/pricing" 
                routerLinkActive="text-primary-600 dark:text-primary-400"
                class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors duration-200"
              >
                Pricing
              </a>
              <a 
                routerLink="/artists" 
                routerLinkActive="text-primary-600 dark:text-primary-400"
                class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors duration-200"
              >
                Artists
              </a>
              <a 
                routerLink="/support" 
                routerLinkActive="text-primary-600 dark:text-primary-400"
                class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors duration-200"
              >
                Support
              </a>
            </div>
          </div>

          <!-- Right Side Actions -->
          <div class="flex items-center gap-4">
            <!-- Theme Toggle -->
            <app-button
              variant="ghost"
              size="sm"
              iconOnly="true"
              (click)="toggleTheme()"
              class="hidden sm:block"
            >
              <svg *ngIf="!isDarkMode" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <svg *ngIf="isDarkMode" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </app-button>

            <!-- User Authentication -->
            <div *ngIf="!user" class="flex items-center gap-3">
              <app-button 
                variant="ghost" 
                size="sm"
                routerLink="/signin"
                class="hidden sm:block"
              >
                Sign In
              </app-button>
              <app-button 
                variant="primary" 
                size="sm"
                routerLink="/signup"
              >
                Get Started
              </app-button>
            </div>

            <!-- User Menu -->
            <div *ngIf="user" class="relative">
              <app-button
                variant="ghost"
                size="sm"
                (click)="toggleUserMenu()"
                class="flex items-center gap-2"
              >
                <img 
                  *ngIf="user.avatar" 
                  [src]="user.avatar" 
                  [alt]="user.name"
                  class="w-6 h-6 rounded-full object-cover"
                />
                <div 
                  *ngIf="!user.avatar"
                  class="w-6 h-6 rounded-full bg-brand-gradient flex items-center justify-center"
                >
                  <span class="text-xs font-medium text-white">
                    {{ user.name.charAt(0).toUpperCase() }}
                  </span>
                </div>
                <span class="hidden sm:block font-medium">{{ user.name }}</span>
                <svg class="w-4 h-4 transition-transform duration-200" [class.rotate-180]="showUserMenu" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </app-button>

              <!-- User Dropdown Menu -->
              <div 
                *ngIf="showUserMenu"
                class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
              >
                <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ user.name }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</p>
                </div>
                
                <a routerLink="/c/music" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  Dashboard
                </a>
                <a routerLink="/settings" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  Settings
                </a>
                <a routerLink="/billing" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  Billing
                </a>
                <hr class="my-2 border-gray-200 dark:border-gray-700">
                <button 
                  (click)="signOut()"
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>

            <!-- Mobile Menu Toggle -->
            <app-button
              *ngIf="showMobileToggle"
              variant="ghost"
              size="sm"
              iconOnly="true"
              (click)="toggleMobileMenu()"
              class="md:hidden"
            >
              <svg *ngIf="!showMobileMenu" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg *ngIf="showMobileMenu" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </app-button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div *ngIf="showMobileMenu && showNavLinks" class="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
          <div class="flex flex-col gap-2 px-4">
            <a 
              routerLink="/features"
              routerLinkActive="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
              class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors duration-200"
              (click)="closeMobileMenu()"
            >
              Features
            </a>
            <a 
              routerLink="/pricing"
              routerLinkActive="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
              class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors duration-200"
              (click)="closeMobileMenu()"
            >
              Pricing
            </a>
            <a 
              routerLink="/artists"
              routerLinkActive="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
              class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors duration-200"
              (click)="closeMobileMenu()"
            >
              Artists
            </a>
            <a 
              routerLink="/support"
              routerLinkActive="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
              class="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors duration-200"
              (click)="closeMobileMenu()"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class TopNavComponent {
  @Input() user: User | null = null;
  @Input() showNavLinks = true;
  @Input() showMobileToggle = true;
  @Input() isDarkMode = false;

  @Output() themeToggle = new EventEmitter<void>();
  @Output() userSignOut = new EventEmitter<void>();
  @Output() mobileMenuToggle = new EventEmitter<boolean>();

  showUserMenu = false;
  showMobileMenu = false;

  toggleTheme(): void {
    this.themeToggle.emit();
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
    this.mobileMenuToggle.emit(this.showMobileMenu);
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false;
    this.mobileMenuToggle.emit(false);
  }

  signOut(): void {
    this.showUserMenu = false;
    this.userSignOut.emit();
  }
}

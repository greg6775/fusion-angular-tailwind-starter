import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TopNavComponent, SidebarComponent, SidebarItem, User } from '../../../shared/components/navigation';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TopNavComponent, SidebarComponent],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Top Navigation -->
      <app-top-nav
        [user]="currentUser"
        [showNavLinks]="false"
        [isDarkMode]="isDarkMode"
        (themeToggle)="toggleTheme()"
        (userSignOut)="signOut()"
      ></app-top-nav>

      <div class="flex">
        <!-- Sidebar -->
        <app-sidebar
          [menuItems]="sidebarItems"
          [title]="'BBN Music'"
          [collapsed]="sidebarCollapsed"
          [showOverlay]="showSidebarOverlay"
          (collapsedChange)="onSidebarCollapsedChange($event)"
        >
          <div slot="footer" class="space-y-2">
            <div *ngIf="!sidebarCollapsed" class="text-xs text-gray-500 dark:text-gray-400 px-4">
              Version 1.0.0
            </div>
          </div>
        </app-sidebar>

        <!-- Main Content -->
        <main [class]="mainContentClasses">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
})
export class DashboardLayoutComponent implements OnInit {
  isDarkMode = false;
  sidebarCollapsed = false;
  showSidebarOverlay = false;

  currentUser: User = {
    id: '1',
    name: 'Demo Artist',
    email: 'demo@bbnmusic.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'
  };

  sidebarItems: SidebarItem[] = [
    {
      id: 'music',
      label: 'Published Drops',
      icon: 'published',
      route: '/c/music',
      badge: '12'
    },
    {
      id: 'drafts',
      label: 'Draft Drops',
      icon: 'drafts',
      route: '/c/music?status=draft',
      badge: '3',
      badgeVariant: 'warning'
    },
    {
      id: 'artists',
      label: 'Artists',
      icon: 'artists',
      route: '/c/artists'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: 'analytics',
      route: '/c/analytics'
    },
    {
      id: 'payouts',
      label: 'Payouts',
      icon: 'payouts',
      route: '/c/payouts'
    },
    {
      id: 'divider1',
      label: '',
      icon: '',
      children: []
    },
    {
      id: 'new-drop',
      label: 'Create new Drop',
      icon: 'plus',
      route: '/c/music/new-drop'
    },
    {
      id: 'new-artist',
      label: 'Create new Artist',
      icon: 'plus',
      action: () => this.createNewArtist()
    }
  ];

  ngOnInit() {
    // Initialize theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }

    // Initialize sidebar state from localStorage
    const savedSidebarState = localStorage.getItem('sidebarCollapsed');
    if (savedSidebarState === 'true') {
      this.sidebarCollapsed = true;
    }
  }

  get mainContentClasses(): string {
    const baseClasses = 'flex-1 transition-all duration-300';
    const marginClass = this.sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64';
    return `${baseClasses} ${marginClass}`;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  onSidebarCollapsedChange(collapsed: boolean): void {
    this.sidebarCollapsed = collapsed;
    localStorage.setItem('sidebarCollapsed', collapsed.toString());
  }

  signOut(): void {
    // TODO: Implement actual sign out logic
    console.log('User signed out');
    // Clear user session and redirect to landing page
    // this.router.navigate(['/']);
  }

  createNewArtist(): void {
    // TODO: Open create artist modal or navigate to create artist page
    console.log('Create new artist');
  }
}

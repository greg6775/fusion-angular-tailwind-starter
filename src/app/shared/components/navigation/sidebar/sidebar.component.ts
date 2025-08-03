import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ButtonComponent } from "../../button/button.component";
import { BadgeComponent } from "../../badge/badge.component";

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  badge?: string | number;
  badgeVariant?: "default" | "primary" | "success" | "warning" | "error";
  children?: SidebarItem[];
  action?: () => void;
}

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, BadgeComponent],
  template: `
    <aside
      [class]="sidebarClasses"
      class="fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40"
    >
      <!-- Header -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div *ngIf="!collapsed" class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-brand-gradient rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </div>
            <span class="text-lg font-bold text-gray-900 dark:text-gray-100">
              {{ title }}
            </span>
          </div>

          <app-button
            variant="ghost"
            size="sm"
            iconOnly="true"
            (click)="toggleCollapse()"
          >
            <svg
              class="w-5 h-5 transition-transform duration-200"
              [class.rotate-180]="collapsed"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </app-button>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto scrollbar-thin">
        <div class="p-4 space-y-2">
          <div *ngFor="let item of menuItems" class="space-y-1">
            <!-- Regular Menu Item -->
            <a
              *ngIf="item.route && !item.children"
              [routerLink]="item.route"
              routerLinkActive="nav-link-active"
              [class]="getNavLinkClasses()"
              [title]="collapsed ? item.label : ''"
            >
              <div
                [innerHTML]="getIcon(item.icon)"
                class="w-5 h-5 flex-shrink-0"
              ></div>
              <span *ngIf="!collapsed" class="font-medium">{{
                item.label
              }}</span>
              <app-badge
                *ngIf="!collapsed && item.badge"
                [variant]="item.badgeVariant || 'default'"
                size="sm"
                class="ml-auto"
              >
                {{ item.badge }}
              </app-badge>
            </a>

            <!-- Action Menu Item -->
            <button
              *ngIf="item.action && !item.children"
              (click)="item.action()"
              [class]="getNavLinkClasses()"
              [title]="collapsed ? item.label : ''"
            >
              <div
                [innerHTML]="getIcon(item.icon)"
                class="w-5 h-5 flex-shrink-0"
              ></div>
              <span *ngIf="!collapsed" class="font-medium">{{
                item.label
              }}</span>
              <app-badge
                *ngIf="!collapsed && item.badge"
                [variant]="item.badgeVariant || 'default'"
                size="sm"
                class="ml-auto"
              >
                {{ item.badge }}
              </app-badge>
            </button>

            <!-- Menu Item with Children -->
            <div *ngIf="item.children" class="space-y-1">
              <button
                (click)="toggleSubmenu(item.id)"
                [class]="getNavLinkClasses()"
                [title]="collapsed ? item.label : ''"
              >
                <div
                  [innerHTML]="getIcon(item.icon)"
                  class="w-5 h-5 flex-shrink-0"
                ></div>
                <span *ngIf="!collapsed" class="font-medium flex-1 text-left">{{
                  item.label
                }}</span>
                <svg
                  *ngIf="!collapsed"
                  class="w-4 h-4 transition-transform duration-200"
                  [class.rotate-90]="expandedSubmenus.has(item.id)"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <!-- Submenu Items -->
              <div
                *ngIf="!collapsed && expandedSubmenus.has(item.id)"
                class="ml-8 space-y-1"
              >
                <a
                  *ngFor="let child of item.children"
                  [routerLink]="child.route"
                  routerLinkActive="nav-link-active"
                  class="nav-link text-sm"
                >
                  <div
                    [innerHTML]="getIcon(child.icon)"
                    class="w-4 h-4 flex-shrink-0"
                  ></div>
                  <span class="font-medium">{{ child.label }}</span>
                  <app-badge
                    *ngIf="child.badge"
                    [variant]="child.badgeVariant || 'default'"
                    size="sm"
                    class="ml-auto"
                  >
                    {{ child.badge }}
                  </app-badge>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <!-- Footer -->
      <div
        *ngIf="showFooter"
        class="p-4 border-t border-gray-200 dark:border-gray-700"
      >
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </aside>

    <!-- Overlay for mobile -->
    <div
      *ngIf="!collapsed && showOverlay"
      class="fixed inset-0 bg-black/50 z-30 lg:hidden"
      (click)="collapse()"
    ></div>
  `,
})
export class SidebarComponent {
  @Input() menuItems: SidebarItem[] = [];
  @Input() title = "BBN Music";
  @Input() collapsed = false;
  @Input() showFooter = false;
  @Input() showOverlay = false;

  @Output() collapsedChange = new EventEmitter<boolean>();

  expandedSubmenus = new Set<string>();

  get sidebarClasses(): string {
    return this.collapsed ? "w-16" : "w-64";
  }

  getNavLinkClasses(): string {
    return "nav-link w-full";
  }

  getIcon(iconName: string): string {
    const icons: { [key: string]: string } = {
      home: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
      music:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>',
      artists:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
      payouts:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
      drafts:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>',
      published:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
      analytics:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>',
      settings:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
      users:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" /></svg>',
      search:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>',
      shield:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>',
      chat: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>',
      wallet:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>',
      takedown:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>',
      reviews:
        '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>',
      plus: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>',
    };

    return icons[iconName] || icons["home"];
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);

    // Clear expanded submenus when collapsed
    if (this.collapsed) {
      this.expandedSubmenus.clear();
    }
  }

  collapse(): void {
    this.collapsed = true;
    this.collapsedChange.emit(true);
  }

  expand(): void {
    this.collapsed = false;
    this.collapsedChange.emit(false);
  }

  toggleSubmenu(itemId: string): void {
    if (this.expandedSubmenus.has(itemId)) {
      this.expandedSubmenus.delete(itemId);
    } else {
      this.expandedSubmenus.add(itemId);
    }
  }
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../button/button.component";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div
      *ngIf="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      (click)="onBackdropClick($event)"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black/50 transition-opacity duration-300"
      ></div>

      <!-- Modal -->
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          [class]="modalClasses"
          class="relative transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 text-left shadow-xl transition-all duration-300 sm:my-8"
          (click)="$event.stopPropagation()"
        >
          <!-- Header -->
          <div
            *ngIf="showHeader"
            class="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center justify-between">
              <h3
                *ngIf="title"
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ title }}
              </h3>
              <ng-content select="[slot=header]"></ng-content>

              <app-button
                *ngIf="showCloseButton"
                variant="ghost"
                size="sm"
                iconOnly="true"
                (click)="close()"
                class="ml-auto"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </app-button>
            </div>
          </div>

          <!-- Content -->
          <div [class]="contentClasses">
            <ng-content></ng-content>
          </div>

          <!-- Footer -->
          <div
            *ngIf="showFooter"
            class="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl"
          >
            <div class="flex items-center justify-end gap-3">
              <ng-content select="[slot=footer]"></ng-content>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = "";
  @Input() size: ModalSize = "md";
  @Input() showHeader = true;
  @Input() showFooter = false;
  @Input() showCloseButton = true;
  @Input() closeOnBackdrop = true;
  @Input() closeOnEscape = true;
  @Input() noPadding = false;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() modalClose = new EventEmitter<void>();

  get modalClasses(): string {
    const sizeClasses = {
      sm: "sm:max-w-sm sm:w-full",
      md: "sm:max-w-md sm:w-full",
      lg: "sm:max-w-lg sm:w-full",
      xl: "sm:max-w-xl sm:w-full",
      full: "sm:max-w-4xl sm:w-full",
    };

    return sizeClasses[this.size];
  }

  get contentClasses(): string {
    return this.noPadding ? "" : "px-6 py-4";
  }

  @HostListener("document:keydown.escape", ["$event"])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.closeOnEscape && this.isOpen) {
      this.close();
    }
  }

  onBackdropClick(event: Event): void {
    if (this.closeOnBackdrop && event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    this.isOpen = false;
    this.openChange.emit(false);
    this.modalClose.emit();
  }

  open(): void {
    this.isOpen = true;
    this.openChange.emit(true);
  }
}

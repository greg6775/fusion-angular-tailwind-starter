import { Component, Input, EventEmitter, Output } from "@angular/core";
import { CommonModule } from "@angular/common";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "icon";
export type ButtonSize = "sm" | "md" | "lg";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="buttonClasses"
      (click)="onClick()"
    >
      <div class="flex items-center justify-center gap-2">
        <svg
          *ngIf="loading"
          class="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>

        <ng-content select="[slot=icon-left]"></ng-content>
        <span *ngIf="!loading && !iconOnly"><ng-content></ng-content></span>
        <ng-content select="[slot=icon-right]"></ng-content>
      </div>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = "primary";
  @Input() size: ButtonSize = "md";
  @Input() type: "button" | "submit" | "reset" = "button";
  @Input() disabled = false;
  @Input() loading = false;
  @Input() iconOnly = false;
  @Input() fullWidth = false;
  @Output() click = new EventEmitter<void>();

  get buttonClasses(): string {
    const baseClasses =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

    const variantClasses = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      outline: "btn-outline",
      ghost: "btn-ghost",
      icon: "btn-icon",
    };

    const sizeClasses = {
      sm: this.variant === "icon" ? "p-1.5" : "px-3 py-2 text-sm",
      md: this.variant === "icon" ? "p-2" : "px-4 py-2.5 text-base",
      lg: this.variant === "icon" ? "p-3" : "px-6 py-3 text-lg",
    };

    const widthClass = this.fullWidth ? "w-full" : "";

    return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]} ${widthClass}`.trim();
  }

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.click.emit();
    }
  }
}

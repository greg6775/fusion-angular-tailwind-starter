import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type BadgeSize = "sm" | "md" | "lg";

@Component({
  selector: "app-badge",
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClasses">
      <ng-content select="[slot=icon]"></ng-content>
      <ng-content></ng-content>
    </span>
  `,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = "default";
  @Input() size: BadgeSize = "md";
  @Input() dot = false;

  get badgeClasses(): string {
    const baseClasses =
      "inline-flex items-center gap-1.5 font-medium rounded-full transition-colors duration-200";

    const variantClasses = {
      default: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
      primary:
        "bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300",
      secondary:
        "bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300",
      success:
        "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
      warning:
        "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300",
      error: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
      info: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
    };

    const sizeClasses = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
      lg: "px-3 py-1.5 text-base",
    };

    const dotClass = this.dot ? "pl-1" : "";

    return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]} ${dotClass}`.trim();
  }
}

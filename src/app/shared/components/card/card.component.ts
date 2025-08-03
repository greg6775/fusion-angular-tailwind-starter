import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'default' | 'hover' | 'pricing' | 'feature' | 'testimonial';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses">
      <div *ngIf="header" class="p-6 border-b border-gray-200 dark:border-gray-700">
        <ng-content select="[slot=header]"></ng-content>
      </div>
      
      <div [class]="contentClasses">
        <ng-content></ng-content>
      </div>
      
      <div *ngIf="footer" class="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-b-2xl">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() header = false;
  @Input() footer = false;
  @Input() noPadding = false;

  get cardClasses(): string {
    const variantClasses = {
      default: 'card',
      hover: 'card card-hover',
      pricing: 'card-pricing',
      feature: 'card-feature',
      testimonial: 'card-testimonial'
    };

    return variantClasses[this.variant];
  }

  get contentClasses(): string {
    if (this.noPadding) return '';
    
    const paddingClasses = {
      default: 'p-6',
      hover: 'p-6',
      pricing: 'p-6',
      feature: 'p-8',
      testimonial: 'p-8'
    };

    return paddingClasses[this.variant];
  }
}

import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative">
      <label
        *ngIf="label"
        [for]="inputId"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-1">*</span>
      </label>

      <div class="relative">
        <div
          *ngIf="prefixIcon"
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <ng-content select="[slot=prefix-icon]"></ng-content>
        </div>

        <input
          [id]="inputId"
          [type]="inputType"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          [value]="value"
          [class]="inputClasses"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
        />

        <div
          *ngIf="suffixIcon"
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <ng-content select="[slot=suffix-icon]"></ng-content>
        </div>

        <button
          *ngIf="type === 'password'"
          type="button"
          class="absolute inset-y-0 right-0 pr-3 flex items-center"
          (click)="togglePasswordVisibility()"
        >
          <svg
            *ngIf="inputType === 'password'"
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <svg
            *ngIf="inputType === 'text'"
            class="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
            />
          </svg>
        </button>
      </div>

      <p *ngIf="error" class="mt-2 text-sm text-red-600 dark:text-red-400">
        {{ error }}
      </p>

      <p
        *ngIf="hint && !error"
        class="mt-2 text-sm text-gray-500 dark:text-gray-400"
      >
        {{ hint }}
      </p>
    </div>
  `,
})
export class InputComponent implements ControlValueAccessor {
  @Input() label = "";
  @Input() placeholder = "";
  @Input() type: InputType = "text";
  @Input() required = false;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() error = "";
  @Input() hint = "";
  @Input() prefixIcon = false;
  @Input() suffixIcon = false;
  @Input() inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  @Output() inputChange = new EventEmitter<string>();
  @Output() inputBlur = new EventEmitter<void>();
  @Output() inputFocus = new EventEmitter<void>();

  value = "";
  inputType: InputType = "text";

  private onChange = (value: string) => {};
  private onTouched = () => {};

  ngOnInit() {
    this.inputType = this.type;
  }

  get inputClasses(): string {
    const baseClasses = "input-primary";
    const errorClasses = this.error ? "input-error" : "";
    const paddingClasses = this.prefixIcon
      ? "pl-10"
      : this.suffixIcon
        ? "pr-10"
        : "";

    return `${baseClasses} ${errorClasses} ${paddingClasses}`.trim();
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.inputChange.emit(this.value);
  }

  onBlur(): void {
    this.onTouched();
    this.inputBlur.emit();
  }

  onFocus(): void {
    this.inputFocus.emit();
  }

  togglePasswordVisibility(): void {
    if (this.type === "password") {
      this.inputType = this.inputType === "password" ? "text" : "password";
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || "";
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

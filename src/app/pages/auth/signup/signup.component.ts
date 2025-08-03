import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  ButtonComponent,
  InputComponent,
  CardComponent,
} from "../../../shared/components";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    CardComponent,
  ],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4"
    >
      <!-- Background Effects -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-primary-500/5"
      ></div>
      <div
        class="absolute inset-0"
        style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1000 1000%22><defs><radialGradient id=%22a%22 cx=%22.5%22 cy=%22.5%22 r=%22.5%22><stop offset=%220%25%22 stop-color=%22%23ffffff%22 stop-opacity=%22.05%22/><stop offset=%22100%25%22 stop-color=%22%23ffffff%22 stop-opacity=%220%22/></radialGradient></defs><rect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23a)%22/></svg>'); opacity: 0.1;"
      ></div>

      <div class="relative z-10 w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
          <div class="flex items-center justify-center gap-3 mb-6">
            <div
              class="w-12 h-12 bg-brand-gradient rounded-xl flex items-center justify-center"
            >
              <svg
                class="w-7 h-7 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </div>
            <span class="text-2xl font-bold text-white">BBN Music</span>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">Join BBN Music</h1>
          <p class="text-gray-400">Start distributing your music worldwide</p>
        </div>

        <!-- Signup Form -->
        <app-card class="backdrop-blur-lg bg-white/10 border-white/20">
          <form
            [formGroup]="signupForm"
            (ngSubmit)="onSubmit()"
            class="space-y-6"
          >
            <!-- Name Fields -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <app-input
                label="First Name"
                placeholder="Enter your first name"
                formControlName="firstName"
                [error]="getFieldError('firstName')"
                required="true"
              ></app-input>

              <app-input
                label="Last Name"
                placeholder="Enter your last name"
                formControlName="lastName"
                [error]="getFieldError('lastName')"
                required="true"
              ></app-input>
            </div>

            <!-- Email -->
            <app-input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              formControlName="email"
              [error]="getFieldError('email')"
              required="true"
            ></app-input>

            <!-- Artist Name -->
            <app-input
              label="Artist/Label Name"
              placeholder="Enter your artist or label name"
              formControlName="artistName"
              [error]="getFieldError('artistName')"
              hint="This will be displayed publicly"
              required="true"
            ></app-input>

            <!-- Password -->
            <app-input
              label="Password"
              type="password"
              placeholder="Create a strong password"
              formControlName="password"
              [error]="getFieldError('password')"
              hint="At least 8 characters with letters and numbers"
              required="true"
            ></app-input>

            <!-- Confirm Password -->
            <app-input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              formControlName="confirmPassword"
              [error]="getFieldError('confirmPassword')"
              required="true"
            ></app-input>

            <!-- Terms and Privacy -->
            <div class="space-y-4">
              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  formControlName="agreeToTerms"
                  class="mt-1 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                />
                <span class="text-sm text-gray-300">
                  I agree to the
                  <a
                    href="/terms"
                    class="text-primary-400 hover:text-primary-300 underline"
                    >Terms of Service</a
                  >
                  and
                  <a
                    href="/privacy"
                    class="text-primary-400 hover:text-primary-300 underline"
                    >Privacy Policy</a
                  >
                </span>
              </label>

              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  formControlName="subscribeNewsletter"
                  class="mt-1 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                />
                <span class="text-sm text-gray-300">
                  Send me updates about new features and music industry news
                </span>
              </label>
            </div>

            <!-- Submit Button -->
            <app-button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth="true"
              [loading]="isLoading"
              [disabled]="signupForm.invalid"
            >
              Create Account
            </app-button>

            <!-- Divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-600"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-transparent text-gray-400"
                  >Or continue with</span
                >
              </div>
            </div>

            <!-- Social Login -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <app-button
                type="button"
                variant="secondary"
                fullWidth="true"
                (click)="signupWithGoogle()"
                class="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <svg slot="icon-left" class="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </app-button>

              <app-button
                type="button"
                variant="secondary"
                fullWidth="true"
                (click)="signupWithDiscord()"
                class="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <svg
                  slot="icon-left"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0188 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"
                  />
                </svg>
                Discord
              </app-button>
            </div>
          </form>
        </app-card>

        <!-- Sign In Link -->
        <div class="text-center mt-6">
          <p class="text-gray-400">
            Already have an account?
            <a
              routerLink="/signin"
              class="text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group(
      {
        firstName: ["", [Validators.required, Validators.minLength(2)]],
        lastName: ["", [Validators.required, Validators.minLength(2)]],
        email: ["", [Validators.required, Validators.email]],
        artistName: ["", [Validators.required, Validators.minLength(2)]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordValidator,
          ],
        ],
        confirmPassword: ["", [Validators.required]],
        agreeToTerms: [false, [Validators.requiredTrue]],
        subscribeNewsletter: [false],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordValidator(control: any) {
    const value = control.value;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);
    const isValid = hasNumber && hasLetter;

    return isValid ? null : { invalidPassword: true };
  }

  passwordMatchValidator(form: any) {
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  getFieldError(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors["required"])
        return `${this.getFieldDisplayName(fieldName)} is required`;
      if (field.errors["email"]) return "Please enter a valid email address";
      if (field.errors["minlength"])
        return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors["minlength"].requiredLength} characters`;
      if (field.errors["invalidPassword"])
        return "Password must contain at least one letter and one number";
      if (field.errors["passwordMismatch"]) return "Passwords do not match";
    }
    return "";
  }

  getFieldDisplayName(fieldName: string): string {
    const names: { [key: string]: string } = {
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      artistName: "Artist name",
      password: "Password",
      confirmPassword: "Confirm password",
    };
    return names[fieldName] || fieldName;
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;

      try {
        // TODO: Implement actual signup logic
        console.log("Signup form data:", this.signupForm.value);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

        // Redirect to dashboard or show success message
        // this.router.navigate(['/c/music']);
      } catch (error) {
        console.error("Signup error:", error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  async signupWithGoogle() {
    // TODO: Implement Google OAuth signup
    console.log("Signup with Google");
  }

  async signupWithDiscord() {
    // TODO: Implement Discord OAuth signup
    console.log("Signup with Discord");
  }
}

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
  selector: "app-signin",
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
          <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p class="text-gray-400">Sign in to your BBN Music account</p>
        </div>

        <!-- Signin Form -->
        <app-card class="backdrop-blur-lg bg-white/10 border-white/20">
          <form
            [formGroup]="signinForm"
            (ngSubmit)="onSubmit()"
            class="space-y-6"
          >
            <!-- Email -->
            <app-input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              formControlName="email"
              [error]="getFieldError('email')"
              required="true"
            ></app-input>

            <!-- Password -->
            <app-input
              label="Password"
              type="password"
              placeholder="Enter your password"
              formControlName="password"
              [error]="getFieldError('password')"
              required="true"
            ></app-input>

            <!-- Remember Me and Forgot Password -->
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  formControlName="rememberMe"
                  class="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-400"
                />
                <span class="text-sm text-gray-300">Remember me</span>
              </label>

              <a
                routerLink="/forgot-password"
                class="text-sm text-primary-400 hover:text-primary-300 transition-colors duration-200"
              >
                Forgot password?
              </a>
            </div>

            <!-- Submit Button -->
            <app-button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth="true"
              [loading]="isLoading"
              [disabled]="signinForm.invalid"
            >
              Sign In
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
                (click)="signinWithGoogle()"
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
                (click)="signinWithDiscord()"
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

        <!-- Sign Up Link -->
        <div class="text-center mt-6">
          <p class="text-gray-400">
            Don't have an account?
            <a
              routerLink="/signup"
              class="text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200"
            >
              Sign up for free
            </a>
          </p>
        </div>

        <!-- Demo Account -->
        <div class="text-center mt-4">
          <app-button
            variant="ghost"
            size="sm"
            (click)="signinWithDemo()"
            class="text-gray-400 hover:text-gray-300"
          >
            Try with demo account
          </app-button>
        </div>
      </div>
    </div>
  `,
})
export class SigninComponent {
  signinForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      rememberMe: [false],
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.signinForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors["required"])
        return `${this.getFieldDisplayName(fieldName)} is required`;
      if (field.errors["email"]) return "Please enter a valid email address";
    }
    return "";
  }

  getFieldDisplayName(fieldName: string): string {
    const names: { [key: string]: string } = {
      email: "Email",
      password: "Password",
    };
    return names[fieldName] || fieldName;
  }

  async onSubmit() {
    if (this.signinForm.valid) {
      this.isLoading = true;

      try {
        // TODO: Implement actual signin logic
        console.log("Signin form data:", this.signinForm.value);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call

        // Redirect to dashboard
        // this.router.navigate(['/c/music']);
      } catch (error) {
        console.error("Signin error:", error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  async signinWithGoogle() {
    // TODO: Implement Google OAuth signin
    console.log("Signin with Google");
  }

  async signinWithDiscord() {
    // TODO: Implement Discord OAuth signin
    console.log("Signin with Discord");
  }

  async signinWithDemo() {
    // TODO: Implement demo account signin
    console.log("Signin with demo account");
    this.signinForm.patchValue({
      email: "demo@bbnmusic.com",
      password: "demopassword",
    });
  }
}

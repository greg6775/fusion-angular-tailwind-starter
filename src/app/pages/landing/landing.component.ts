import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import {
  ButtonComponent,
  CardComponent,
  BadgeComponent,
} from "../../shared/components";
import { TopNavComponent } from "../../shared/components/navigation";

interface Feature {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface Testimonial {
  name: string;
  quote: string;
  avatar: string;
  role?: string;
}

interface PlatformLogo {
  name: string;
  icon: string;
}

@Component({
  selector: "app-landing",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    CardComponent,
    BadgeComponent,
    TopNavComponent,
  ],
  template: `
    <!-- Navigation -->
    <app-top-nav
      [user]="null"
      [showNavLinks]="true"
      [isDarkMode]="isDarkMode"
      (themeToggle)="toggleTheme()"
    ></app-top-nav>

    <!-- Hero Section -->
    <section
      class="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <!-- Background -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      >
        <div
          class="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-primary-500/10"
        ></div>
        <div
          class="absolute inset-0"
          style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1000 1000%22><defs><radialGradient id=%22a%22 cx=%22.5%22 cy=%22.5%22 r=%22.5%22><stop offset=%220%25%22 stop-color=%22%23ffffff%22 stop-opacity=%22.1%22/><stop offset=%22100%25%22 stop-color=%22%23ffffff%22 stop-opacity=%220%22/></radialGradient></defs><rect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23a)%22/></svg>'); opacity: 0.1;"
        ></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 container-max section-padding text-center">
        <div class="max-w-4xl mx-auto">
          <h1
            class="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
          >
            <span class="block">Drop in with your</span>
            <span
              class="text-gradient bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
            >
              Audience
            </span>
          </h1>

          <p
            class="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            BBN Music, your gateway to unlimited music distribution at a low
            cost. Maximize your reach without limits. Join us and let the world
            hear your music.
          </p>

          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <app-button
              variant="primary"
              size="lg"
              routerLink="/signup"
              class="text-lg px-8 py-4"
            >
              Drop your Music
            </app-button>

            <app-button
              variant="outline"
              size="lg"
              routerLink="/demo"
              class="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900"
            >
              Watch Demo
            </app-button>
          </div>

          <!-- Stats -->
          <div
            class="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">195</div>
              <div class="text-gray-400">Countries</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">52</div>
              <div class="text-gray-400">Music Stores</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-white mb-2">10K+</div>
              <div class="text-gray-400">Artists</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Platform Logos Section -->
    <section class="section-padding bg-gray-50 dark:bg-gray-900">
      <div class="container-max">
        <div class="text-center mb-16">
          <h2
            class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Let your fans enjoy your Drops where they feel home.
          </h2>
        </div>

        <!-- Scrolling Platform Logos -->
        <div class="relative overflow-hidden">
          <div class="flex animate-scroll-left space-x-12">
            <div
              *ngFor="let platform of [...platformLogos, ...platformLogos]"
              class="flex-shrink-0"
            >
              <div
                class="platform-logo w-16 h-16 flex items-center justify-center"
              >
                <div [innerHTML]="platform.icon" class="w-12 h-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="section-padding">
      <div class="container-max">
        <div class="text-center mb-16">
          <h2
            class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Our pricing plan to disrupt the Market:
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <!-- Free Plan -->
          <app-card variant="pricing" class="relative">
            <div class="text-center">
              <app-badge variant="secondary" class="mb-6">Free Plan</app-badge>

              <div class="mb-8">
                <div
                  class="text-6xl font-black text-gray-900 dark:text-gray-100 mb-2"
                >
                  97<span class="text-2xl">%</span>
                </div>
                <div class="text-lg text-gray-600 dark:text-gray-400">
                  Revenue Share
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  No Extra Cost
                </div>
              </div>

              <div class="space-y-4 mb-8 text-left">
                <div class="flex items-center gap-3">
                  <svg
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300"
                    >Unlimited Drops</span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <svg
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300"
                    >Unlimited Artists</span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <svg
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300"
                    >Reach 52 Stores</span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <svg
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300"
                    >Reach 195 Countries</span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <svg
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300"
                    >No Payment Needed</span
                  >
                </div>
              </div>

              <app-button
                variant="primary"
                size="lg"
                fullWidth="true"
                routerLink="/signup"
              >
                Drop Now!
              </app-button>
            </div>
          </app-card>

          <!-- Paid Plan -->
          <app-card variant="pricing" class="relative border-primary-500">
            <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <app-badge variant="primary">Most Popular</app-badge>
            </div>

            <div class="text-center">
              <app-badge variant="primary" class="mb-6">Paid Plan</app-badge>

              <div class="mb-8">
                <div
                  class="text-6xl font-black text-gray-900 dark:text-gray-100 mb-2"
                >
                  100<span class="text-2xl">%</span>
                </div>
                <div class="text-lg text-gray-600 dark:text-gray-400">
                  Revenue Share
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  1€ per Year
                </div>
              </div>

              <div class="space-y-4 mb-8 text-left">
                <div class="flex items-center gap-3">
                  <svg
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300"
                    >No Revenue Cut</span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <svg
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300"
                    >Fully Customizable</span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <svg
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300"
                    >Priority Queue</span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <svg
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300"
                    >Priority Support</span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <svg
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="text-gray-700 dark:text-gray-300"
                    >All Free Features</span
                  >
                </div>
              </div>

              <app-button
                variant="secondary"
                size="lg"
                fullWidth="true"
                disabled="true"
              >
                Coming Soon
              </app-button>
            </div>
          </app-card>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section-padding bg-gray-50 dark:bg-gray-900">
      <div class="container-max">
        <div class="text-center mb-16">
          <h2
            class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Why BBN Music?
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <app-card
            *ngFor="let feature of features"
            variant="feature"
            class="text-center"
          >
            <div
              [class]="
                'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ' +
                feature.color
              "
            >
              <div [innerHTML]="feature.icon" class="w-8 h-8 text-white"></div>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ feature.description }}
            </p>
          </app-card>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="section-padding">
      <div class="container-max">
        <div class="text-center mb-16">
          <h2
            class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Loved by Artists
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            See how our Artists value BBN Music
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <app-card
            *ngFor="let testimonial of testimonials"
            variant="testimonial"
          >
            <div class="flex items-start gap-4 mb-6">
              <img
                [src]="testimonial.avatar"
                [alt]="testimonial.name"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-gray-100">
                  {{ testimonial.name }}
                </h4>
                <p
                  *ngIf="testimonial.role"
                  class="text-sm text-gray-500 dark:text-gray-400"
                >
                  {{ testimonial.role }}
                </p>
              </div>
            </div>
            <blockquote
              class="text-gray-700 dark:text-gray-300 italic leading-relaxed"
            >
              "{{ testimonial.quote }}"
            </blockquote>
          </app-card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="section-padding bg-gradient-to-r from-primary-600 to-primary-700"
    >
      <div class="container-max text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to drop your music?
        </h2>
        <p class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          Join thousands of artists who trust BBN Music to distribute their
          music worldwide.
        </p>
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <app-button
            variant="secondary"
            size="lg"
            routerLink="/signup"
            class="bg-white text-primary-600 hover:bg-gray-100"
          >
            Start for Free
          </app-button>
          <app-button
            variant="outline"
            size="lg"
            routerLink="/contact"
            class="border-white text-white hover:bg-white hover:text-primary-600"
          >
            Contact Sales
          </app-button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300">
      <div class="container-max py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Brand -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center gap-3 mb-6">
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
              <span class="text-xl font-bold text-white">BBN Music</span>
            </div>
            <p class="text-gray-400 leading-relaxed max-w-md">
              Your gateway to unlimited music distribution at a low cost.
              Maximize your reach without limits and let the world hear your
              music.
            </p>
          </div>

          <!-- Links -->
          <div>
            <h3 class="font-semibold text-white mb-4">Product</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="hover:text-white transition-colors duration-200"
                  >Features</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-white transition-colors duration-200"
                  >Pricing</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-white transition-colors duration-200"
                  >Artists</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-white transition-colors duration-200"
                  >Stores</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-semibold text-white mb-4">Support</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="#"
                  class="hover:text-white transition-colors duration-200"
                  >Help Center</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-white transition-colors duration-200"
                  >Contact</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-white transition-colors duration-200"
                  >API Docs</a
                >
              </li>
              <li>
                <a
                  href="#"
                  class="hover:text-white transition-colors duration-200"
                  >Status</a
                >
              </li>
            </ul>
          </div>
        </div>

        <hr class="my-8 border-gray-700" />

        <div class="flex flex-col md:flex-row items-center justify-between">
          <p class="text-gray-400 text-sm">
            © 2024 BBN Music. All rights reserved.
          </p>
          <div class="flex items-center gap-6 mt-4 md:mt-0">
            <a
              href="#"
              class="text-gray-400 hover:text-white transition-colors duration-200"
              >Privacy</a
            >
            <a
              href="#"
              class="text-gray-400 hover:text-white transition-colors duration-200"
              >Terms</a
            >
            <a
              href="#"
              class="text-gray-400 hover:text-white transition-colors duration-200"
              >Cookies</a
            >
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class LandingComponent {
  isDarkMode = false;

  features: Feature[] = [
    {
      title: "Lowest Cut",
      description: "With our free plan, we only take a 3% cut of your revenue.",
      icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
      color: "bg-red-500",
    },
    {
      title: "Global",
      description:
        "We support all major and many smaller stores, without any extra cost for you.",
      icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM11 19.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
      color: "bg-green-500",
    },
    {
      title: "Unlimited",
      description:
        "No hard limits. You can manage as many Drops and Artists as you want.",
      icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
      color: "bg-blue-500",
    },
  ];

  testimonials: Testimonial[] = [
    {
      name: "Redz",
      quote:
        "BBN Music has been incredible for getting my tracks out there. The distribution is fast and reaches so many platforms.",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      role: "Hip-Hop Artist",
    },
    {
      name: "Criticz",
      quote:
        "Love the simplicity and the low cut they take. Finally a platform that cares about artists keeping their earnings.",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
      role: "Electronic Producer",
    },
  ];

  platformLogos: PlatformLogo[] = [
    {
      name: "Spotify",
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
    },
    {
      name: "Apple Music",
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>',
    },
    {
      name: "YouTube Music",
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 16.568c-.54 0-.96-.24-1.44-.48-.48-.24-1.08-.48-1.68-.48s-1.2.24-1.68.48c-.48.24-.9.48-1.44.48s-.96-.24-1.44-.48c-.48-.24-1.08-.48-1.68-.48s-1.2.24-1.68.48c-.48.24-.9.48-1.44.48-.96 0-1.68-.72-1.68-1.68V9.12c0-.96.72-1.68 1.68-1.68.54 0 .96.24 1.44.48.48.24 1.08.48 1.68.48s1.2-.24 1.68-.48c.48-.24.9-.48 1.44-.48s.96.24 1.44.48c.48.24 1.08.48 1.68.48s1.2-.24 1.68-.48c.48-.24.9-.48 1.44-.48.96 0 1.68.72 1.68 1.68v5.76c0 .96-.72 1.68-1.68 1.68z"/></svg>',
    },
    {
      name: "TikTok",
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    },
    {
      name: "Deezer",
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.81 16.22h3.68v1.5h-3.68zm0-2.76h3.68v1.5h-3.68zm0-2.76h3.68v1.5h-3.68zm-4.91 5.52h3.68v1.5h-3.68zm0-2.76h3.68v1.5h-3.68zm0-2.76h3.68v1.5h-3.68zm-4.91 5.52h3.68v1.5H8.99zm0-2.76h3.68v1.5H8.99zm0-2.76h3.68v1.5H8.99zM4.08 16.22h3.68v1.5H4.08zm0-2.76h3.68v1.5H4.08z"/></svg>',
    },
    {
      name: "Tidal",
      icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 6.996L8.983 4 12.017 1.004 15.05 4zm0 5.983L8.983 9.996 12.017 7l3.033 2.996zm0 6.004L8.983 16 12.017 13.004 15.05 16zm6.983-6.004L15.967 10 18.983 7.004 22 10zm-6.966 0L8.967 10 12 7.004 15.033 10z"/></svg>',
    },
  ];

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
}

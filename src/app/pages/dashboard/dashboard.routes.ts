import { Routes } from "@angular/router";

export const dashboardRoutes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./dashboard-layout/dashboard-layout.component").then(
        (m) => m.DashboardLayoutComponent,
      ),
    children: [
      {
        path: "",
        redirectTo: "music",
        pathMatch: "full",
      },
      {
        path: "music",
        loadComponent: () =>
          import("./music/music-dashboard.component").then(
            (m) => m.MusicDashboardComponent,
          ),
        title: "Music Dashboard - BBN Music",
      },
      {
        path: "music/new-drop",
        loadComponent: () =>
          import("./music/new-drop/new-drop.component").then(
            (m) => m.NewDropComponent,
          ),
        title: "New Drop - BBN Music",
      },
      {
        path: "artists",
        loadComponent: () =>
          import("./artists/artists.component").then((m) => m.ArtistsComponent),
        title: "Artists - BBN Music",
      },
      {
        path: "payouts",
        loadComponent: () =>
          import("./payouts/payouts.component").then((m) => m.PayoutsComponent),
        title: "Payouts - BBN Music",
      },
      {
        path: "analytics",
        loadComponent: () =>
          import("./analytics/analytics.component").then(
            (m) => m.AnalyticsComponent,
          ),
        title: "Analytics - BBN Music",
      },
    ],
  },
];

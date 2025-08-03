import { Routes } from "@angular/router";

export const adminRoutes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./admin-layout/admin-layout.component").then(
        (m) => m.AdminLayoutComponent,
      ),
    children: [
      {
        path: "",
        redirectTo: "overview",
        pathMatch: "full",
      },
      {
        path: "overview",
        loadComponent: () =>
          import("./overview/overview.component").then(
            (m) => m.OverviewComponent,
          ),
        title: "Admin Overview - BBN Music",
      },
      {
        path: "reviews",
        loadComponent: () =>
          import("./reviews/reviews.component").then((m) => m.ReviewsComponent),
        title: "Reviews - BBN Music Admin",
      },
      {
        path: "publishing",
        loadComponent: () =>
          import("./publishing/publishing.component").then(
            (m) => m.PublishingComponent,
          ),
        title: "Publishing - BBN Music Admin",
      },
      {
        path: "payouts",
        loadComponent: () =>
          import("./payouts/admin-payouts.component").then(
            (m) => m.AdminPayoutsComponent,
          ),
        title: "Admin Payouts - BBN Music",
      },
      {
        path: "search",
        loadComponent: () =>
          import("./search/search.component").then((m) => m.SearchComponent),
        title: "Search - BBN Music Admin",
      },
      {
        path: "users",
        loadComponent: () =>
          import("./users/users.component").then((m) => m.UsersComponent),
        title: "Users - BBN Music Admin",
      },
      {
        path: "groups",
        loadComponent: () =>
          import("./groups/groups.component").then((m) => m.GroupsComponent),
        title: "Groups - BBN Music Admin",
      },
      {
        path: "chats",
        loadComponent: () =>
          import("./chats/chats.component").then((m) => m.ChatsComponent),
        title: "Chats - BBN Music Admin",
      },
      {
        path: "wallets",
        loadComponent: () =>
          import("./wallets/wallets.component").then((m) => m.WalletsComponent),
        title: "Wallets - BBN Music Admin",
      },
      {
        path: "takedown",
        loadComponent: () =>
          import("./takedown/takedown.component").then(
            (m) => m.TakedownComponent,
          ),
        title: "Takedown - BBN Music Admin",
      },
    ],
  },
];

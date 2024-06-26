import { NavItemType } from "@/types/menu.type";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "CredPulse",

  description: "CredPulse App",
};

export const menuItems: NavItemType[] = [
  // {
  //   title: "Home",
  //   href: "/dashboard/home",
  //   icon: "home",
  //   subMenus: [
  //     {
  //       title: "Example 1",
  //       href: "/dashboard/reports",
  //     },
  //     {
  //       title: "Example 2",
  //       href: "/dashboard/example-2",
  //     },
  //   ],
  // },
  // {
  //   title: "Utility",
  //   href: "/dashboard/utility",
  //   icon: "documentChartBar",
  // },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: "bookOpen",
  },
  {
    title: "Visualization",
    href: "/dashboard/visualization",
    icon: "presentationChart",
  },
  // {
  //   title: "Logs",
  //   href: "/dashboard/logs",
  //   icon: "documentTextIcon",
  // },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "cogTooth",
  },
];

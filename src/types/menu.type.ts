import { Icons, IconTypes } from "@/components/ui/icons";

export interface MenuItemType {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: IconTypes;
  label?: string;
  description?: string;
}
export interface NavItemType extends MenuItemType {
  subMenus?: MenuItemType[];
}

export interface NavItemWithChildren extends NavItemType {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItemType {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

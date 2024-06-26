"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { NavItemType } from "@/types/menu.type";
import { signOut } from "next-auth/react";
import { Icons } from "../ui/icons";

interface DashboardNavProps {
  items: NavItemType[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  open?: boolean;
}

export function DashboardNav({ items, setOpen, open }: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <>
      <div className="  grid  items-start gap-4 overflow-hidden ">
        {items.map((item, index) => {
          if (item?.subMenus?.length)
            return (
              <SubMenuItem
                key={index}
                {...{ menu: item, path, setOpen, open }}
              />
            );
          return (
            <MenuItem
              key={item?.title}
              {...{ menu: item, path, setOpen, open }}
            />
          );
        })}
      </div>
      <div className="grid  gap-4  overflow-hidden p-5 ">
        {/* <ThemeToggle>
          <div
            className={cn(
              " flex cursor-pointer items-center gap-2 text-base font-medium  hover:text-primary",
            )}
          >
            <SunIcon className="h-7 w-7  rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-7 w-7  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span
              className={cn({
                "scale-0": !open,
              })}
            >
              Theme
            </span>
          </div>
        </ThemeToggle> */}

        <div
          onClick={() => {
            signOut();
          }}
          className={cn(
            " flex cursor-pointer items-center justify-start  hover:text-primary",
          )}
        >
          <span
            className={cn(
              "group mr-auto flex w-full items-center justify-start space-x-2 rounded-md  py-2   pl-1 font-medium   hover:bg-accent ",
            )}
          >
            <Icons.logout className=" h-6 w-6" />
            <span
              className={cn({
                "scale-0": !open,
              })}
            >
              Logout
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

interface MenuItemProps {
  menu: NavItemType;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  path?: string;
  open?: boolean;
  isSubMenuItem?: boolean;
}

const hasActiveMenu = (href: string, path?: string) => {
  if (href === "/dashboard") return href === path;
  return path?.includes(href);
};

const MenuItem = ({
  menu,
  setOpen,
  open,
  path,
  isSubMenuItem,
}: MenuItemProps) => {
  const Icon = Icons[menu?.icon || "arrowRight"];
  const isActive = hasActiveMenu(menu.href, path);
  return (
    <Link
      key={menu.title}
      href={menu.disabled ? "/" : menu.href}
      onClick={() => {
        if (setOpen) setOpen(false);
      }}
      className={cn(
        "relative flex cursor-pointer items-center hover:text-primary",
        {
          " text-primary": isActive,
        },
      )}
    >
      {isActive && !isSubMenuItem && (
        <div className="absolute bottom-0 left-0 top-0 h-full  rounded-r-lg border-l-4 border-primary text-primary" />
      )}
      <span
        className={cn(
          "group flex w-full items-center space-x-2  rounded-md  px-5 py-2 font-medium   hover:bg-accent ",

          menu.disabled && "cursor-not-allowed opacity-80",
        )}
      >
        {!isSubMenuItem && Icon && <Icon className=" h-8 w-8" />}
        <span
          className={cn({
            "scale-0": !open,
          })}
        >
          {menu.title}
        </span>
      </span>
    </Link>
  );
};

const SubMenuItem = ({ menu, setOpen, path, open }: MenuItemProps) => {
  const Icon = Icons[menu?.icon || "arrowRight"];
  const isActive = menu.subMenus?.some((menu) =>
    hasActiveMenu(menu.href, path),
  );

  return (
    <Accordion className="w-full" type="single" collapsible>
      <AccordionItem className="w-full border-b-0" value={menu?.href}>
        <AccordionTrigger
          className={cn(
            "  relative flex items-center justify-between space-x-2 rounded-md px-3 py-2 text-start text-base  font-medium transition-none hover:text-primary hover:no-underline",
            {
              "text-primary data-[state=closed]:bg-accent": isActive,
            },
          )}
        >
          {isActive && (
            <div className="h absolute bottom-0 left-0 top-0  h-full rounded-r-lg border-l-4 border-primary text-primary" />
          )}

          <div className="flex items-center gap-2">
            <Icon
              className={cn("  h-8 w-8", {
                "ml-2": !isActive,
              })}
            />{" "}
            <span
              className={cn({
                "scale-0": !open,
              })}
            >
              {menu.title}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="ml-6 border-l pb-0 pl-2 text-base">
          {menu?.subMenus?.map((menu) => (
            <MenuItem
              isSubMenuItem
              key={menu?.href}
              {...{ menu, setOpen, path, open }}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

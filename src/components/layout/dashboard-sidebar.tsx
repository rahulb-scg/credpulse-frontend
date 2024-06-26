"use client";
import { menuItems, siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Icons } from "../ui/icons";
import { DashboardNav } from "./dashboard-nav";

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn(
        `fixed bottom-0 left-0 top-0 z-50  flex w-20  flex-col justify-between border-r bg-muted py-6   duration-300 `,
        {
          "w-[280px]": open,
        },
      )}
      onMouseEnter={(e) => {
        setOpen(true);
      }}
      onMouseLeave={(e) => {
        setOpen(false);
      }}
    >
      <Icons.arrowRight
        className={cn(
          "absolute right-1 top-4 z-20 h-7 w-7 cursor-pointer overflow-hidden rounded-full  bg-muted text-muted-foreground",
          {
            "rotate-180": open,
          },
        )}
      />

      <div className="inline-flex   p-5 ">
        <div className="space-y-1 py-6 ">
          <div className="flex items-center">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary p-2 text-xl font-bold  text-gray-200 text-primary">
              CP
            </div>
            <h2
              className={cn(
                "px-2 text-xl font-bold italic tracking-tight text-primary duration-300",
                {
                  "scale-0": !open,
                },
              )}
            >
              {siteConfig.name}
            </h2>
          </div>
        </div>
      </div>
      <DashboardNav items={menuItems} {...{ open }} />
    </nav>
  );
}

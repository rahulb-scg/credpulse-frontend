"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  Cog8ToothIcon,
  DocumentTextIcon,
  DocumentChartBarIcon,
  BookOpenIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import SidebarLink from "./SideBarLink";

function SideNavItem({
  route,
  children,
}: {
  route: string;
  children: React.ReactNode;
}) {
  const path = usePathname();
  return (
    <Link
      href={route}
      className={
        (path == route ? "bg-gray-300 text-primary" : "") +
        " flex w-full flex-row items-center space-x-4 rounded-3xl p-2 px-6 hover:bg-gray-500 hover:text-white"
      }
    >
      {children}
    </Link>
  );
}

export default function Sidebar() {
  const [openLabel, setOpenLabel] = useState("");

  return (
    <div className="w-sidebar-closed hover:w-sidebar-open fixed z-30 flex h-full flex-col  overflow-hidden overflow-y-auto border-r border-black/20 bg-white transition-all">
      <Link href="/" legacyBehavior>
        <div className="ml-5 mt-8 flex items-center  gap-2.5">
          {/* <img
            src="/images/sampleLogo.png"
            alt="consola.logo"
            className="h-10 w-12"
          /> */}
          <span className="mt-1 text-sm font-bold italic">CredPulse</span>
        </div>
      </Link>
      <nav className="flex h-full flex-col justify-center">
        <Accordion.Root
          type="single"
          onValueChange={(value) => {
            setOpenLabel(value);
          }}
          value={openLabel}
          collapsible
        >
          <SidebarLink location="/home" label="Home" Icon={HomeIcon} />
          <SidebarLink
            location="/utility"
            label="Utility"
            Icon={DocumentChartBarIcon}
          />
          <SidebarLink
            location="/reports"
            label="Reports"
            Icon={BookOpenIcon}
          />
          <SidebarLink
            location="/visualization"
            label="Visualization"
            Icon={PresentationChartBarIcon}
          />
          <SidebarLink location="/logs" label="Logs" Icon={DocumentTextIcon} />
          <SidebarLink
            location="/settings"
            label="Settings"
            Icon={Cog8ToothIcon}
          />
        </Accordion.Root>
      </nav>
    </div>
  );
}

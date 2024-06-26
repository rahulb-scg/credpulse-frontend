import { siteConfig } from "@/config/site.config";

import ThemeToggle from "./providers/theme-toggle";
import { UserNav } from "./user-nav";

export default function DashboardHeader() {
  return (
    <nav className="sticky top-0 flex h-14  w-full shrink-0 items-center justify-between border-b px-4">
      <div className=" text-xl font-bold italic text-primary  ">
        {siteConfig.name}
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserNav />
      </div>
    </nav>
  );
}

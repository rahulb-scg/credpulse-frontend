import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

type Props = {
  Icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  location: string;
  label: string;
};

const SidebarLink: FC<Props> = ({ Icon, location, label }) => {
  const pathname = usePathname();

  let isActive =
    location != "/" ? pathname.startsWith(location) : pathname === location;

  return (
    <Link href={location}>
      <div
        className={`
            ${isActive ? " bg-black/5 font-medium" : " hover:bg-black/5"}
            
            w-sidebar-open group relative flex items-center gap-6 py-6 pl-7 transition-all`}
      >
        <Icon
          className={`group-hover:animate-wiggle h-7 w-7 ${
            isActive ? "stroke-blue-500" : "stroke-text-detail"
          }`}
        />
        {isActive && (
          <span className="absolute left-0 top-1/2 block h-full w-2 -translate-y-1/2 transform rounded-r-full bg-blue-400" />
        )}
        <span className="text-md">{label}</span>
      </div>
    </Link>
  );
};

export default SidebarLink;

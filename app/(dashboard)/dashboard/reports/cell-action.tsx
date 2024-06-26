"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { CustomTooltip } from "@/components/ui/tooltip";
import { toast } from "@/hooks/core/use-toast";
import { DictionaryType } from "@/types/common.type";
import { useSession } from "next-auth/react";
import Link from "next/link";

const CellAction = ({ data }: { data: DictionaryType }) => {
  return (
    <div className="flex items-center  gap-2">
      <CustomTooltip message="Go to Detail">
        <Link
          className={buttonVariants({
            variant: "outline",
            size: "sm",
          })}
          href={`/dashboard/reports/d/${data?.id}`}
        >
          <Icons.pill className="h-4 w-4" />
        </Link>
      </CustomTooltip>
      <CustomTooltip asChild={false} message="Download">
        <ReportLink
          key={data.report_name}
          type={data.report_type}
          name={data.report_name}
          link={data?.processed_url ?? data?.file?.url}
        />
      </CustomTooltip>
    </div>
  );
};

function ReportLink({
  name,
  type,
  link,
}: {
  name: string;
  type: string;
  link?: string;
}) {
  return (
    <>
      {link && (
        <Link href={link} target="_blank" download={name} className="text-link">
          <Button size={"sm"} variant={"outline"} className="w-full ">
            <div className="flex items-center justify-center gap-1 ">
              <Icons.arrowDropdown className="h-4 w-4 text-blue-500" />
              {/* Download */}
            </div>
          </Button>
        </Link>
      )}
    </>
  );
}

function DeleteLink({ type, name }: { type: string; name: string }) {
  const session = useSession();

  const handleDelete = async () => {
    const token = session.data?.access_token;
    if (!token) {
      toast({
        title: "Not logged in",
        description: "Please login to delete this report",
      });
      return;
    }
    toast({
      title: "Delete Report",
      description: "It's not working right now",
    });
  };
  return (
    <Button
      onClick={handleDelete}
      variant={"outline"}
      size={"sm"}
      className="border-destructive"
    >
      <div className=" flex items-center justify-center gap-1">
        <Icons.trash className="h-4 w-4 text-destructive " />
        {/* Delete */}
      </div>
    </Button>
  );
}

export default CellAction;

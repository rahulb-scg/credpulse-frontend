import Link from "next/link";
import React from "react";
interface AuthFooterProps {
  description: string;
  linkLabel: string;
  link: string;
  disabledSeparator?: boolean;
}
const AuthFooter = ({
  description,
  linkLabel,
  link,
  disabledSeparator,
}: AuthFooterProps) => {
  return (
    <div className="grid gap-2">
      {" "}
      <p className="flex items-center justify-center gap-1 text-center text-sm">
        {description}
        <Link className="flex text-blue-500 hover:underline" href={link}>
          {linkLabel}
        </Link>
      </p>
      {!disabledSeparator && (
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-800 px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthFooter;

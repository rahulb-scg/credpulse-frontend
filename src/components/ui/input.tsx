import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "prefix" | "suffix"
  > {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, suffix, ...props }, ref) => {
    const withSuffixPrefix = React.useCallback(() => {
      return (
        <div className={cn("relative flex items-center ", className)}>
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className,
              prefix && "pl-8",
              suffix && "pr-8",
            )}
            ref={ref}
            {...props}
          />
          {prefix && <span className="absolute left-2 ">{prefix}</span>}
          {suffix && (
            <span className="absolute right-2 transition-colors">{suffix}</span>
          )}
        </div>
      );
    }, [className, type, prefix, suffix, ref, props]);
    if (prefix || suffix) return withSuffixPrefix();
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

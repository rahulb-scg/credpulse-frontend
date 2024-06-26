import React from "react";
import { Icons } from "./icons";
import { Input, InputProps } from "./input";

export const PasswordInput = ({ type, ...props }: InputProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Input
      type={open ? "text" : "password"}
      suffix={
        open ? (
          <Icons.eyeOff
            className="auth-input-icon h-4 w-4 cursor-pointer "
            onClick={() => setOpen(!open)}
          />
        ) : (
          <Icons.eye
            className="auth-input-icon h-4 w-4 cursor-pointer "
            onClick={() => setOpen(!open)}
          />
        )
      }
      {...props}
    />
  );
};

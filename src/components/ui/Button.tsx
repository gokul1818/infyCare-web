import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "px-4 py-2 rounded-[12px] h-12 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2",
        fullWidth && "w-full",
        {
          "bg-primary  text-white hover:opacity-90 focus:ring-primary":
            variant === "primary",

          "bg-secondary text-white hover:bg-secondary-light focus:ring-secondary":
            variant === "secondary",

          "bg-danger text-white hover:opacity-90 focus:ring-danger":
            variant === "danger",
        },
        className
      )}
    >
      {children}
    </button>
  );
}

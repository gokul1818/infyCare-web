import type { InputHTMLAttributes, ReactNode } from "react";
import { useState } from "react";
import clsx from "clsx";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function TextInput({
  label,
  error,
  leftIcon,
  rightIcon,
  type = "text",
  className,
  ...rest
}: TextInputProps) {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-normal text-title mb-1">{label}</label>
      )}

      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600">
            {leftIcon}
          </span>
        )}

        <input
          {...rest}
          type={inputType}
          className={clsx(
            "w-full h-12 rounded-[10px] border px-3 text-sm focus:outline-none focus:ring-2",
            leftIcon && "pl-10",
            (rightIcon || isPassword) && "pr-10",
            error
              ? "border-danger focus:ring-danger"
              : "border-border focus:ring-primary",
            className
          )}
        />

        {/* Right Icon / Password Toggle */}
        {(rightIcon || isPassword) && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-600"
            onClick={isPassword ? () => setShowPassword((p) => !p) : undefined}
          >
            {isPassword ? (
              showPassword ? (
                <MdVisibilityOff />
              ) : (
                <MdVisibility />
              )
            ) : (
              rightIcon
            )}
          </span>
        )}
      </div>

      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
}

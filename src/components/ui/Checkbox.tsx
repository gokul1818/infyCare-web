import { InputHTMLAttributes, ReactNode } from "react";
import { Controller, Control, FieldValues } from "react-hook-form";
import clsx from "clsx";
import { MdCheck } from "react-icons/md";

interface BaseProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  label?: ReactNode;
  error?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

interface ControlledProps<T extends FieldValues> extends BaseProps {
  name: string;
  control: Control<T>;
}

interface UncontrolledProps extends BaseProps {
  name?: never;
  control?: never;
}

type CheckboxProps<T extends FieldValues> =
  | ControlledProps<T>
  | UncontrolledProps;

export default function Checkbox<T extends FieldValues>(
  props: CheckboxProps<T>
) {
  const { label, error, className, checked, onChange, ...rest } = props;

  const CheckboxField = ({
    value,
    onChange,
  }: {
    value?: boolean;
    onChange?: (v: boolean) => void;
  }) => (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      {/* Hidden native checkbox */}
      <input
        type="checkbox"
        checked={!!value}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only"
        {...rest}
      />

      {/* Custom UI */}
      <span
        className={clsx(
          "h-4 w-4 flex items-center justify-center rounded border transition-all",
          value
            ? "bg-primary border-primary"
            : "bg-background-card border-border",
          error && "border-danger",
          className
        )}
      >
        {value && <MdCheck className="text-white text-xs" />}
      </span>

      {label && (
        <span className="text-sm text-text">
          {label}
        </span>
      )}
    </label>
  );

  return (
    <div className="space-y-1">
      {"control" in props && props.control && props.name ? (
        <Controller
          name={props.name}
          control={props.control}
          render={({ field }) => (
            <CheckboxField
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      ) : (
        <CheckboxField
          value={checked}
          onChange={onChange}
        />
      )}

      {error && (
        <p className="text-xs text-danger">{error}</p>
      )}
    </div>
  );
}

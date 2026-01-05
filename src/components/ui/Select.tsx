import clsx from "clsx";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function Select({
  label,
  options,
  value,
  onChange,
  error,
}: SelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-secondary">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2",
          error
            ? "border-danger focus:ring-danger"
            : "border-gray-300 focus:ring-primary"
        )}
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-xs text-danger">{error}</p>
      )}
    </div>
  );
}

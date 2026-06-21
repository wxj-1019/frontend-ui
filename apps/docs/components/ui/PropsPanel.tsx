"use client";

interface PropConfig {
  name: string;
  type: "number" | "string" | "boolean";
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}

interface PropsPanelProps {
  props: PropConfig[];
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  onReset?: () => void;
}

export function PropsPanel({ props, values, onChange, onReset }: PropsPanelProps) {
  return (
    <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)]">
          属性调节
        </h3>
        {onReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-[var(--color-text-subtle)] transition-colors hover:bg-[var(--color-hover)] hover:text-[var(--color-accent)]"
            aria-label="重置属性"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            重置
          </button>
        )}
      </div>
      <div className="space-y-4">
        {props.map((prop) => (
          <div key={prop.name}>
            <label className="mb-1.5 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span className="font-display">{prop.name}</span>
              <span className="font-mono text-[var(--color-accent)]">
                {prop.type === "boolean"
                  ? values[prop.name] ? "true" : "false"
                  : String(values[prop.name])}
              </span>
            </label>

            {/* Number slider */}
            {prop.type === "number" && (
              <input
                type="range"
                min={prop.min}
                max={prop.max}
                step={prop.step}
                value={Number(values[prop.name])}
                onChange={(e) => onChange(prop.name, parseFloat(e.target.value))}
                aria-label={prop.name}
                className="w-full accent-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-secondary)]"
              />
            )}

            {/* String select */}
            {prop.type === "string" && prop.options && (
              <select
                value={String(values[prop.name])}
                onChange={(e) => onChange(prop.name, e.target.value)}
                aria-label={prop.name}
                className="w-full rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm text-[var(--color-text-primary)] transition-shadow focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]"
              >
                {prop.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {/* String text */}
            {prop.type === "string" && !prop.options && (
              <input
                type="text"
                value={String(values[prop.name])}
                onChange={(e) => onChange(prop.name, e.target.value)}
                aria-label={prop.name}
                className="w-full rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm text-[var(--color-text-primary)] transition-shadow focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]"
              />
            )}

            {/* Boolean toggle */}
            {prop.type === "boolean" && (
              <button
                onClick={() => onChange(prop.name, !values[prop.name])}
                className={`relative h-6 w-11 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-secondary)] ${
                  values[prop.name]
                    ? "bg-[var(--color-accent)]"
                    : "bg-[var(--color-border-default)]"
                }`}
                role="switch"
                aria-checked={Boolean(values[prop.name])}
                aria-label={prop.name}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                    values[prop.name] ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

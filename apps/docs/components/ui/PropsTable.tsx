"use client";

interface PropsTableProps {
  props: {
    name: string;
    type: string;
    required?: boolean;
    default?: string;
    description: string;
  }[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border-default)]">
      <table className="w-full text-left text-sm" aria-label="组件属性列表">
        <caption className="sr-only">组件 Props API 文档</caption>
        <thead className="border-b border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium text-[var(--color-text-primary)]">
              属性
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-[var(--color-text-primary)]">
              类型
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-[var(--color-text-primary)]">
              默认值
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-[var(--color-text-primary)]">
              说明
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-border-subtle)]">
          {props.map((prop) => (
            <tr key={prop.name}>
              <td className="px-4 py-3">
                <code className="font-mono text-[var(--color-accent)]">
                  {prop.name}
                </code>
                {prop.required && (
                  <span className="ml-1 text-xs text-[var(--color-accent)]" aria-label="必填">
                    *
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-[var(--color-text-muted)]">
                {prop.type}
              </td>
              <td className="px-4 py-3 text-[var(--color-text-subtle)]">
                {prop.default || "-"}
              </td>
              <td className="px-4 py-3 text-[var(--color-text-muted)]">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

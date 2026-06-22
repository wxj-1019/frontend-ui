export interface PropConfig {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'color';
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}

export interface PropDoc {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

import type { ReactNode } from 'react';

export interface HeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export interface HeroSectionBaseProps {
  title: string;
  subtitle?: string;
  actions?: HeroAction[];
  className?: string;
  /** Whether to reduce motion on load */
  prefersReducedMotion?: boolean;
  children?: ReactNode;
}

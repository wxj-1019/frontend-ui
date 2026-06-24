import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ShinyText } from './shiny-text';
import { expectNoA11yViolations } from '../../test-utils/axe';

describe('ShinyText', () => {
  it('renders text content', () => {
    render(<ShinyText text="Hello Shiny" />);
    expect(screen.getByText('Hello Shiny')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<ShinyText text="Accessible Shiny" />);
    await expectNoA11yViolations(container);
  });

  it('applies custom className', () => {
    const { container } = render(
      <ShinyText text="Styled" className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('supports different render tags', () => {
    const { container } = render(<ShinyText text="Heading" as="h2" />);
    expect(container.querySelector('h2')).toBeInTheDocument();
  });

  it('has aria-label for screen readers', () => {
    render(<ShinyText text="Accessible" />);
    expect(screen.getByLabelText('Accessible')).toBeInTheDocument();
  });
});

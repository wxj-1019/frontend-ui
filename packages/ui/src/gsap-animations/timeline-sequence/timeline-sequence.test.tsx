import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TimelineSequence } from './timeline-sequence';

describe('TimelineSequence', () => {
  it('renders children content', () => {
    render(
      <TimelineSequence steps={[]}>
        <span>Timeline Content</span>
      </TimelineSequence>
    );
    expect(screen.getByText('Timeline Content')).toBeInTheDocument();
  });

  it('accepts steps with selectors', () => {
    render(
      <TimelineSequence
        steps={[
          { selector: '.step-1', to: { x: 100 } },
          { selector: '.step-2', to: { opacity: 1 } },
        ]}
      >
        <div className="step-1">Step 1</div>
        <div className="step-2">Step 2</div>
      </TimelineSequence>
    );
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });

  it('accepts scrollTrigger option', () => {
    render(
      <TimelineSequence
        steps={[{ selector: '.box', to: { x: 50 } }]}
        scrollTrigger
        scrub={1}
      >
        <div className="box">Scrolled</div>
      </TimelineSequence>
    );
    expect(screen.getByText('Scrolled')).toBeInTheDocument();
  });
});

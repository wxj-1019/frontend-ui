import type { Meta, StoryObj } from '@storybook/react';
import { TimelineSequence, useTimeline } from './timeline-sequence';


const meta: Meta<typeof TimelineSequence> = {
  title: 'GSAP Animations/TimelineSequence',
  component: TimelineSequence,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimelineSequence>;

export const BasicSequence: Story = {
  render: () => (
    <div style={{ minHeight: '200vh', padding: '40px' }}>
      <div style={{ marginTop: '60vh' }}>
        <TimelineSequence
          steps={[
            { selector: '.box1', to: { x: 200, opacity: 1 }, position: 0 },
            { selector: '.box2', to: { y: -100, opacity: 1 }, position: 0.3 },
            { selector: '.box3', to: { rotation: 360, scale: 1.5 }, position: 0.6 },
          ]}
          scrollTrigger
          scrub={0.5}
          className="relative"
        >
          <div
            className="box1"
            style={{
              width: '100px',
              height: '100px',
              background: '#667eea',
              borderRadius: '12px',
              opacity: 0,
              marginBottom: '20px',
            }}
          />
          <div
            className="box2"
            style={{
              width: '100px',
              height: '100px',
              background: '#764ba2',
              borderRadius: '12px',
              opacity: 0,
              marginBottom: '20px',
            }}
          />
          <div
            className="box3"
            style={{
              width: '100px',
              height: '100px',
              background: '#f093fb',
              borderRadius: '12px',
              marginBottom: '20px',
            }}
          />
        </TimelineSequence>
      </div>
    </div>
  ),
};

export const InteractiveTimeline: Story = {
  render: () => {
    const TimelineDemo = () => {
      const { ref, play, pause, reverse } = useTimeline(
        [
          { selector: '.circle', to: { x: 300, backgroundColor: '#f5576c' }, position: 0 },
          { selector: '.circle', to: { y: -100, scale: 1.5 }, position: 0.5 },
          { selector: '.circle', to: { rotation: 720, borderRadius: '50%' }, position: 1 },
        ],
        { defaults: { duration: 1, ease: 'power2.inOut' } }
      );

      return (
        <div style={{ padding: '40px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
            <button
              onClick={play}
              style={{
                padding: '8px 16px',
                background: '#667eea',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Play
            </button>
            <button
              onClick={pause}
              style={{
                padding: '8px 16px',
                background: '#764ba2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Pause
            </button>
            <button
              onClick={reverse}
              style={{
                padding: '8px 16px',
                background: '#f093fb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Reverse
            </button>
          </div>
          <div ref={ref} style={{ position: 'relative', height: '200px' }}>
            <div
              className="circle"
              style={{
                width: '80px',
                height: '80px',
                background: '#667eea',
                borderRadius: '12px',
                position: 'absolute',
                top: '50%',
                left: '0',
                transform: 'translateY(-50%)',
              }}
            />
          </div>
        </div>
      );
    };

    return <TimelineDemo />;
  },
};

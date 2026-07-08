import type { Meta, StoryObj } from '@storybook/react';
import { tokens } from '@maxilius/tokens';

const meta: Meta = { title: 'Foundations/Spacing & Effects' };
export default meta;

const label: React.CSSProperties = {
  fontFamily: 'var(--mx-font-family-mono)',
  fontSize: 'var(--mx-font-size-xs)',
  color: 'var(--mx-text-muted)',
  width: 140,
};

export const Spacing: StoryObj = {
  name: 'Spacing (4px base)',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--mx-space-3)' }}>
      {Object.entries(tokens.primitives.space as Record<string, string>).map(([step, size]) => (
        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 'var(--mx-space-4)' }}>
          <code style={label}>space-{step} · {size}</code>
          <div style={{ width: size, height: 16, background: 'var(--mx-action-primary-bg)', borderRadius: 2 }} />
        </div>
      ))}
    </div>
  ),
};

export const Radii: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--mx-space-6)', flexWrap: 'wrap' }}>
      {Object.entries(tokens.primitives.radius as Record<string, string>).map(([step, r]) => (
        <div key={step} style={{ textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: r, background: 'var(--mx-action-secondary-bg)' }} />
          <code style={{ ...label, width: 'auto' }}>{step}</code>
        </div>
      ))}
    </div>
  ),
};

export const Shadows: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--mx-space-8)', flexWrap: 'wrap', padding: 'var(--mx-space-6)' }}>
      {Object.entries(tokens.primitives.shadow as Record<string, string>).map(([step, s]) => (
        <div key={step} style={{ textAlign: 'center' }}>
          <div style={{ width: 120, height: 80, borderRadius: 'var(--mx-radius-lg)', background: 'var(--mx-bg-surface)', boxShadow: s }} />
          <code style={{ ...label, width: 'auto' }}>shadow-{step}</code>
        </div>
      ))}
    </div>
  ),
};

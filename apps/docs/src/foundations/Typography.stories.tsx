import type { Meta, StoryObj } from '@storybook/react';
import { tokens } from '@maxilius/tokens';

const meta: Meta = { title: 'Foundations/Typography' };
export default meta;

export const TypeScale: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--mx-space-4)', fontFamily: 'var(--mx-font-family-sans)', color: 'var(--mx-text-primary)' }}>
      {Object.entries(tokens.primitives.font.size as Record<string, string>)
        .reverse()
        .map(([step, size]) => (
          <div key={step} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--mx-space-4)' }}>
            <code style={{ width: 120, color: 'var(--mx-text-muted)', fontFamily: 'var(--mx-font-family-mono)', fontSize: 'var(--mx-font-size-xs)' }}>
              {step} · {size}
            </code>
            <span style={{ fontSize: size, lineHeight: 'var(--mx-font-line-height-tight)', letterSpacing: parseFloat(size) >= 1.5 ? 'var(--mx-font-letter-spacing-tight)' : undefined }}>
              Design for Developers
            </span>
          </div>
        ))}
    </div>
  ),
};

export const WeightsAndFamilies: StoryObj = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--mx-space-4)', color: 'var(--mx-text-primary)' }}>
      {Object.entries(tokens.primitives.font.weight as Record<string, string>).map(([name, weight]) => (
        <div key={name} style={{ fontFamily: 'var(--mx-font-family-sans)', fontWeight: weight, fontSize: 'var(--mx-font-size-xl)' }}>
          Inter {name} ({weight}) — Sphinx of black quartz, judge my vow
        </div>
      ))}
      <div style={{ fontFamily: 'var(--mx-font-family-mono)', fontSize: 'var(--mx-font-size-md)', color: 'var(--mx-text-secondary)' }}>
        JetBrains Mono — const tokens = buildTokens();
      </div>
    </div>
  ),
};

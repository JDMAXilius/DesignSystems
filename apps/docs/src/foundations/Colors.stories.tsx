import type { Meta, StoryObj } from '@storybook/react';
import { tokens } from '@maxilius/tokens';

const meta: Meta = { title: 'Foundations/Colors' };
export default meta;

const Swatch = ({ name, value }: { name: string; value: string }) => (
  <div style={{ fontFamily: 'var(--mx-font-family-mono)', fontSize: 'var(--mx-font-size-xs)' }}>
    <div
      style={{
        height: 48,
        borderRadius: 'var(--mx-radius-md)',
        background: value,
        border: '1px solid var(--mx-border-subtle)',
      }}
    />
    <div style={{ marginTop: 4, color: 'var(--mx-text-primary)' }}>{name}</div>
    <div style={{ color: 'var(--mx-text-muted)' }}>{value}</div>
  </div>
);

export const Ramps: StoryObj = {
  name: 'Primitive ramps',
  render: () => {
    const ramps = ['gray', 'blue', 'teal', 'amber', 'red', 'green'] as const;
    return (
      <div style={{ display: 'grid', gap: 'var(--mx-space-6)' }}>
        {ramps.map((ramp) => (
          <div key={ramp}>
            <h3 style={{ fontFamily: 'var(--mx-font-family-sans)', color: 'var(--mx-text-primary)', textTransform: 'capitalize' }}>
              {ramp}
              <span style={{ color: 'var(--mx-text-muted)', fontWeight: 400, fontSize: 'var(--mx-font-size-sm)', marginLeft: 8 }}>
                {ramp === 'amber' || ramp === 'red' ? 'warm — attention' : 'cool — framework'}
              </span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: 'var(--mx-space-2)' }}>
              {Object.entries(tokens.primitives.color[ramp] as Record<string, string>).map(([step, value]) => (
                <Swatch key={step} name={step} value={value} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Semantic: StoryObj = {
  name: 'Semantic roles',
  render: () => {
    const groups = tokens.semantic.light as Record<string, Record<string, unknown>>;
    const flat = (obj: Record<string, unknown>, prefix: string[]): [string, string][] =>
      Object.entries(obj).flatMap(([k, v]) =>
        typeof v === 'string' ? [[[...prefix, k].join('.'), v] as [string, string]] : flat(v as Record<string, unknown>, [...prefix, k]),
      );
    return (
      <div style={{ display: 'grid', gap: 'var(--mx-space-6)' }}>
        {Object.entries(groups).map(([group, sub]) => (
          <div key={group}>
            <h3 style={{ fontFamily: 'var(--mx-font-family-sans)', color: 'var(--mx-text-primary)' }}>{group}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 'var(--mx-space-3)' }}>
              {flat(sub, [group]).map(([name]) => {
                const cssVar = `--mx-${name.split('.').join('-')}`;
                return <Swatch key={name} name={name} value={`var(${cssVar})`} />;
              })}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

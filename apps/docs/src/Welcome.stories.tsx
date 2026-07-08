import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Button, Card, CardBody, CardHeader } from '@maxilius/react';

const meta: Meta = { title: 'Welcome' };
export default meta;

export const Maxilius: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 720, fontFamily: 'var(--mx-font-family-sans)', color: 'var(--mx-text-primary)' }}>
      <Badge variant="primary">v0.1.0</Badge>
      <h1 style={{ fontSize: 'var(--mx-font-size-4xl)', letterSpacing: 'var(--mx-font-letter-spacing-tight)', margin: 'var(--mx-space-4) 0' }}>
        Maxilius Design System
      </h1>
      <p style={{ fontSize: 'var(--mx-font-size-lg)', color: 'var(--mx-text-secondary)', lineHeight: 'var(--mx-font-line-height-relaxed)' }}>
        A token-driven design system: cool colors build the framework, warm colors demand
        attention. Grounded in <em>Enhance UI — Design for Developers</em>.
      </p>
      <div style={{ display: 'flex', gap: 'var(--mx-space-3)', margin: 'var(--mx-space-6) 0' }}>
        <Button variant="primary">Primary action</Button>
        <Button variant="neutral">Secondary action</Button>
        <Button variant="accent">Warm CTA</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--mx-space-4)' }}>
        <Card>
          <CardHeader>Two-tier tokens</CardHeader>
          <CardBody>
            Components consume only semantic roles (<code>--mx-action-primary-bg</code>), never raw
            palette values. Dark mode is a token swap.
          </CardBody>
        </Card>
        <Card>
          <CardHeader>21 components</CardHeader>
          <CardBody>
            The full roster from the book: forms, containers, feedback and data display — all
            keyboard-accessible.
          </CardBody>
        </Card>
      </div>
    </div>
  ),
};

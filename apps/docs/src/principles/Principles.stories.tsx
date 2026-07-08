import type { Meta, StoryObj } from '@storybook/react';
import { Button, Card, CardBody, CardHeader } from '@maxilius/react';

/**
 * Design principles distilled from *Enhance UI — Design for Developers*
 * (Twarog & Moller), demonstrated with live Maxilius components.
 */
const meta: Meta = { title: 'Principles/Visual Hierarchy' };
export default meta;

const Panel = ({ title, good, children }: { title: string; good?: boolean; children: React.ReactNode }) => (
  <Card elevation="flat" style={{ flex: 1, minWidth: 280 }}>
    <CardHeader style={{ color: good === undefined ? undefined : good ? 'var(--mx-feedback-success-text)' : 'var(--mx-feedback-danger-text)' }}>
      {good === undefined ? title : good ? `✓ ${title}` : `✗ ${title}`}
    </CardHeader>
    <CardBody>{children}</CardBody>
  </Card>
);

export const ColorTemperature: StoryObj = {
  name: 'Color temperature',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--mx-space-4)', flexWrap: 'wrap', fontFamily: 'var(--mx-font-family-sans)' }}>
      <Panel title="Warm demands attention" good>
        <p>Cool primary carries routine actions; the single warm accent pulls the eye to the one action that matters.</p>
        <div style={{ display: 'flex', gap: 'var(--mx-space-3)' }}>
          <Button variant="neutral">Cancel</Button>
          <Button variant="primary">Save</Button>
          <Button variant="accent">Upgrade now</Button>
        </div>
      </Panel>
      <Panel title="Everything warm, nothing focal" good={false}>
        <p>When every action shouts, none is heard — hierarchy collapses.</p>
        <div style={{ display: 'flex', gap: 'var(--mx-space-3)' }}>
          <Button variant="accent">Cancel</Button>
          <Button variant="danger">Save</Button>
          <Button variant="accent">Upgrade now</Button>
        </div>
      </Panel>
    </div>
  ),
};

export const Proximity: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--mx-space-4)', flexWrap: 'wrap', fontFamily: 'var(--mx-font-family-sans)' }}>
      <Panel title="Related things sit together" good>
        <div style={{ display: 'grid', gap: 'var(--mx-space-1)' }}>
          <strong>Billing address</strong>
          <span style={{ color: 'var(--mx-text-secondary)' }}>Where invoices are sent</span>
        </div>
        <div style={{ display: 'grid', gap: 'var(--mx-space-1)', marginTop: 'var(--mx-space-6)' }}>
          <strong>Shipping address</strong>
          <span style={{ color: 'var(--mx-text-secondary)' }}>Where orders are delivered</span>
        </div>
      </Panel>
      <Panel title="Uniform gaps hide structure" good={false}>
        <div style={{ display: 'grid', gap: 'var(--mx-space-4)' }}>
          <strong>Billing address</strong>
          <span style={{ color: 'var(--mx-text-secondary)' }}>Where invoices are sent</span>
          <strong>Shipping address</strong>
          <span style={{ color: 'var(--mx-text-secondary)' }}>Where orders are delivered</span>
        </div>
      </Panel>
    </div>
  ),
};

export const NegativeSpace: StoryObj = {
  name: 'Negative space',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--mx-space-4)', flexWrap: 'wrap', fontFamily: 'var(--mx-font-family-sans)' }}>
      <Panel title="Room to breathe" good>
        <div style={{ padding: 'var(--mx-space-6)', textAlign: 'center' }}>
          <h3 style={{ margin: 0 }}>Start your free trial</h3>
          <p style={{ color: 'var(--mx-text-secondary)', margin: 'var(--mx-space-3) 0 var(--mx-space-5)' }}>
            No credit card required.
          </p>
          <Button variant="primary">Get started</Button>
        </div>
      </Panel>
      <Panel title="Cramped content competes" good={false}>
        <div style={{ padding: 0, textAlign: 'center' }}>
          <h3 style={{ margin: 0 }}>Start your free trial</h3>
          <p style={{ color: 'var(--mx-text-secondary)', margin: 0 }}>No credit card required.</p>
          <Button variant="primary">Get started</Button>
        </div>
      </Panel>
    </div>
  ),
};

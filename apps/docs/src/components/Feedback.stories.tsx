import type { Meta, StoryObj } from '@storybook/react';
import { Button, Tooltip, useToast, ToastProvider } from '@maxilius/react';

const meta: Meta = { title: 'Components/Feedback' };
export default meta;

export const TooltipStory: StoryObj = {
  name: 'Tooltip',
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 64, justifyContent: 'center' }}>
      <Tooltip content="Top placement">
        <Button variant="neutral">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom placement" placement="bottom">
        <Button variant="neutral">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left placement" placement="left">
        <Button variant="neutral">Left</Button>
      </Tooltip>
      <Tooltip content="Right placement" placement="right">
        <Button variant="neutral">Right</Button>
      </Tooltip>
    </div>
  ),
};

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button variant="neutral" onClick={() => toast({ title: 'Heads up', description: 'Something informational happened.' })}>
        Info toast
      </Button>
      <Button variant="secondary" onClick={() => toast({ title: 'Saved', description: 'Your changes are live.', variant: 'success' })}>
        Success toast
      </Button>
      <Button variant="accent" onClick={() => toast({ title: 'Storage almost full', variant: 'warning', duration: 8000 })}>
        Warning toast
      </Button>
      <Button variant="danger" onClick={() => toast({ title: 'Deploy failed', description: 'Check the build logs.', variant: 'danger', duration: 0 })}>
        Danger toast (sticky)
      </Button>
    </div>
  );
}

export const ToastStory: StoryObj = {
  name: 'Toast',
  render: () => (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  ),
};

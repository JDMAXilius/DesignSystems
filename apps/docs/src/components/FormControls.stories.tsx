import type { Meta, StoryObj } from '@storybook/react';
import {
  Checkbox,
  Input,
  Label,
  Radio,
  RadioGroup,
  Select,
  Textarea,
  Toggle,
} from '@maxilius/react';

const meta: Meta = { title: 'Components/Form Controls' };
export default meta;

const field: React.CSSProperties = { display: 'grid', gap: 8, maxWidth: 360 };

export const InputStory: StoryObj = {
  name: 'Input',
  render: () => (
    <div style={{ display: 'grid', gap: 24, maxWidth: 360 }}>
      <div style={field}>
        <Label htmlFor="email" required>
          Email
        </Label>
        <Input id="email" type="email" placeholder="you@example.com" iconStart="user" />
      </div>
      <div style={field}>
        <Label htmlFor="search">Search</Label>
        <Input id="search" placeholder="Search components…" iconStart="search" size="lg" />
      </div>
      <div style={field}>
        <Label htmlFor="bad">Invalid</Label>
        <Input id="bad" invalid defaultValue="not-an-email" aria-describedby="bad-err" />
        <span id="bad-err" style={{ color: 'var(--mx-text-danger)', fontSize: 13, fontFamily: 'var(--mx-font-family-sans)' }}>
          Enter a valid email address.
        </span>
      </div>
      <div style={field}>
        <Label htmlFor="off">Disabled</Label>
        <Input id="off" disabled placeholder="Unavailable" />
      </div>
    </div>
  ),
};

export const TextareaStory: StoryObj = {
  name: 'Textarea',
  render: () => (
    <div style={{ display: 'grid', gap: 24, maxWidth: 400 }}>
      <div style={field}>
        <Label htmlFor="msg">Message</Label>
        <Textarea id="msg" placeholder="Tell us more…" />
      </div>
      <div style={field}>
        <Label htmlFor="msg2">Invalid</Label>
        <Textarea id="msg2" invalid defaultValue="Too short" />
      </div>
    </div>
  ),
};

export const SelectStory: StoryObj = {
  name: 'Select',
  render: () => (
    <div style={{ display: 'grid', gap: 24, maxWidth: 320 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div style={field} key={size}>
          <Label htmlFor={`sel-${size}`}>Theme ({size})</Label>
          <Select id={`sel-${size}`} size={size} defaultValue="system">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </Select>
        </div>
      ))}
    </div>
  ),
};

export const CheckboxStory: StoryObj = {
  name: 'Checkbox',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Checkbox label="Send me product updates" defaultChecked />
      <Checkbox label="Weekly digest" description="A summary of activity, every Monday." />
      <Checkbox label="Select all" indeterminate />
      <Checkbox label="Required consent" invalid />
      <Checkbox label="Unavailable option" disabled />
    </div>
  ),
};

export const RadioStory: StoryObj = {
  name: 'Radio',
  render: () => (
    <RadioGroup label="Plan">
      <Radio name="plan" value="free" label="Free" description="For personal projects." defaultChecked />
      <Radio name="plan" value="pro" label="Pro" description="For growing teams." />
      <Radio name="plan" value="enterprise" label="Enterprise" disabled />
    </RadioGroup>
  ),
};

export const ToggleStory: StoryObj = {
  name: 'Toggle',
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Toggle label="Dark mode" defaultChecked />
      <Toggle label="Email notifications" description="Get notified about mentions." />
      <Toggle label="Compact density" size="sm" />
      <Toggle label="Locked setting" disabled />
    </div>
  ),
};

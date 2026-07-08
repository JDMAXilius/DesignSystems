import type { Decorator, Preview } from '@storybook/react';
import '@maxilius/tokens/css';

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string) ?? 'light';
  document.documentElement.dataset.theme = theme;
  document.body.style.background = 'var(--mx-bg-canvas)';
  return <Story />;
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [withTheme],
  parameters: {
    controls: { expanded: true },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: ['Welcome', 'Foundations', 'Principles', 'Components'],
      },
    },
  },
};

export default preview;

import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from '@maxilius/react';

const meta: Meta = { title: 'Components/Containers' };
export default meta;

export const CardStory: StoryObj = {
  name: 'Card',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, maxWidth: 900 }}>
      <Card elevation="flat">
        <CardHeader>Flat</CardHeader>
        <CardBody>Border only — for dense layouts where shadows add noise.</CardBody>
      </Card>
      <Card>
        <CardHeader>
          Raised <Badge variant="primary" size="sm">default</Badge>
        </CardHeader>
        <CardBody>Subtle shadow separates the card from the canvas.</CardBody>
        <CardFooter>
          <Button variant="ghost" size="sm">Dismiss</Button>
          <Button size="sm">Continue</Button>
        </CardFooter>
      </Card>
      <Card elevation="floating" interactive tabIndex={0}>
        <CardHeader>Floating + interactive</CardHeader>
        <CardBody>Hover me — clickable cards lift to signal affordance.</CardBody>
      </Card>
    </div>
  ),
};

export const TabsStory: StoryObj = {
  name: 'Tabs',
  render: () => (
    <Tabs defaultValue="tokens" style={{ maxWidth: 560 }}>
      <TabList label="Documentation sections">
        <Tab value="tokens">Tokens</Tab>
        <Tab value="components">Components</Tab>
        <Tab value="patterns">Patterns</Tab>
        <Tab value="legacy" disabled>
          Legacy
        </Tab>
      </TabList>
      <TabPanel value="tokens">
        Primitives feed semantic roles; components only read semantic custom properties.
      </TabPanel>
      <TabPanel value="components">
        21 components, keyboard accessible, styled exclusively with tokens.
      </TabPanel>
      <TabPanel value="patterns">Compositions and page-level guidance live here.</TabPanel>
    </Tabs>
  ),
};

export const AccordionStory: StoryObj = {
  name: 'Accordion',
  render: () => (
    <Accordion defaultOpen={['what']} style={{ maxWidth: 560 }}>
      <AccordionItem value="what" title="What is Maxilius?">
        A token-driven design system with React components, grounded in the Enhance UI book.
      </AccordionItem>
      <AccordionItem value="theming" title="How does theming work?">
        Set <code>data-theme="dark"</code> on the html element — every semantic token resolves to
        its dark value; components don't change.
      </AccordionItem>
      <AccordionItem value="figma" title="Does it sync to Figma?">
        Tokens export as Figma Variables (Primitives + Semantic Light/Dark modes).
      </AccordionItem>
    </Accordion>
  ),
};

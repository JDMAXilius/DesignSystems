import type { Meta, StoryObj } from '@storybook/react';
import {
  Avatar,
  Badge,
  Breadcrumbs,
  Divider,
  Icon,
  iconNames,
  List,
  ListItem,
  Table,
  TableBody,
  TableHead,
  Td,
  Th,
  Tr,
} from '@maxilius/react';

const meta: Meta = { title: 'Components/Data Display' };
export default meta;

export const BadgeStory: StoryObj = {
  name: 'Badge',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge>Neutral</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success" dot>
        Active
      </Badge>
      <Badge variant="warning" dot>
        Degraded
      </Badge>
      <Badge variant="danger" size="sm">
        Failed
      </Badge>
    </div>
  ),
};

export const AvatarStory: StoryObj = {
  name: 'Avatar',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar name="Juan Delgado" size="xs" />
      <Avatar name="Juan Delgado" size="sm" status="online" />
      <Avatar name="Grace Hopper" size="md" status="busy" />
      <Avatar name="Ada Lovelace" size="lg" shape="square" />
      <Avatar size="xl" />
    </div>
  ),
};

export const IconStory: StoryObj = {
  name: 'Icon',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 16, color: 'var(--mx-text-primary)' }}>
      {iconNames.map((name) => (
        <div key={name} style={{ display: 'grid', placeItems: 'center', gap: 6, fontFamily: 'var(--mx-font-family-mono)', fontSize: 11 }}>
          <Icon name={name} size="lg" />
          <span style={{ color: 'var(--mx-text-muted)' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const DividerStory: StoryObj = {
  name: 'Divider',
  render: () => (
    <div style={{ maxWidth: 420, display: 'grid', gap: 24, fontFamily: 'var(--mx-font-family-sans)', color: 'var(--mx-text-primary)' }}>
      <p>Section one</p>
      <Divider />
      <p>Section two</p>
      <Divider label="or" />
      <p>Section three</p>
    </div>
  ),
};

export const BreadcrumbsStory: StoryObj = {
  name: 'Breadcrumbs',
  render: () => (
    <Breadcrumbs
      items={[
        { label: 'Home', href: '#' },
        { label: 'Design Systems', href: '#' },
        { label: 'Maxilius', href: '#' },
        { label: 'Components' },
      ]}
    />
  ),
};

export const TableStory: StoryObj = {
  name: 'Table',
  render: () => (
    <Table striped hoverable>
      <TableHead>
        <Tr>
          <Th>Component</Th>
          <Th>Status</Th>
          <Th numeric>Variants</Th>
        </Tr>
      </TableHead>
      <TableBody>
        {[
          ['Button', 'Stable', 6],
          ['Input', 'Stable', 3],
          ['Toast', 'Beta', 4],
          ['Table', 'Stable', 3],
        ].map(([name, status, count]) => (
          <Tr key={String(name)}>
            <Td>{name}</Td>
            <Td>
              <Badge variant={status === 'Stable' ? 'success' : 'warning'} dot size="sm">
                {status}
              </Badge>
            </Td>
            <Td numeric>{count}</Td>
          </Tr>
        ))}
      </TableBody>
    </Table>
  ),
};

export const ListStory: StoryObj = {
  name: 'List',
  render: () => (
    <div style={{ display: 'grid', gap: 32, maxWidth: 380 }}>
      <List>
        <ListItem>Two-tier token architecture</ListItem>
        <ListItem>Light and dark themes</ListItem>
        <ListItem>Keyboard accessible</ListItem>
      </List>
      <List variant="plain" divided>
        <ListItem icon="check-circle" iconColor="success">
          Tokens compiled
        </ListItem>
        <ListItem icon="check-circle" iconColor="success">
          Components typed
        </ListItem>
        <ListItem icon="alert-triangle" iconColor="warning">
          Figma sync pending
        </ListItem>
      </List>
    </div>
  ),
};

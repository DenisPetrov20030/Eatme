import type { Meta, StoryObj } from '@storybook/react';

import AdminSidebar from './AdminSidebar';

const meta = {
  component: AdminSidebar,
} satisfies Meta<typeof AdminSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    setActiveLayer: () => {}
  }
};
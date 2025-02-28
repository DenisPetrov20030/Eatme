import type { Meta, StoryObj } from '@storybook/react';

import CartItemCard from './CartItemCard';

const meta = {
  component: CartItemCard,
} satisfies Meta<typeof CartItemCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {}
  }
};
import type { Meta, StoryObj } from '@storybook/react';

import ProductCard from './ProductCard';

const meta = {
  component: ProductCard,
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
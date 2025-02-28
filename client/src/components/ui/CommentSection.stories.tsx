import type { Meta, StoryObj } from '@storybook/react';

import CommentSection from './CommentSection';

const meta = {
  component: CommentSection,
} satisfies Meta<typeof CommentSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    comments: [],
    onAddComment: () => {}
  }
};
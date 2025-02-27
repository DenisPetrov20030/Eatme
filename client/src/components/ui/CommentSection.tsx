import React, { useState } from 'react';
import Comment from '@/types/comments/Comment';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText('');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-400 rounded-full mr-4"></div>
              <span className="font-bold">{comment.user.username}</span>
            </div>
            <p>{comment.comment}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
      <div className="mt-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          rows={3}
          placeholder="Add a comment"
        ></textarea>
        <button
          onClick={handleAddComment}
          className="bg-black hover:bg-gray-800      text-white font-bold py-2 px-4 rounded"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;

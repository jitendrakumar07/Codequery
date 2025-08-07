import { useState } from 'react';

const Comment = ({ comment, onReply }) => {
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText('');
      setShowReplyBox(false);
    }
  };

  return (
    <div className="ml-4 mt-4 border-l-2 border-gray-300 pl-4">
      <p className="text-gray-800">{comment.text}</p>
      <button
        onClick={() => setShowReplyBox(!showReplyBox)}
        className="text-sm text-blue-600"
      >
        {showReplyBox ? 'Cancel' : 'Reply'}
      </button>

      {showReplyBox && (
        <div className="mt-2">
          <textarea
            className="w-full border rounded p-1 text-sm"
            rows={2}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button
            onClick={handleReply}
            className="mt-1 px-2 py-1 text-white bg-blue-600 rounded text-sm"
          >
            Submit Reply
          </button>
        </div>
      )}

      {/* Recursive Rendering of Replies */}
      {comment.replies.map((reply) => (
        <Comment key={reply.id} comment={reply} onReply={onReply} />
      ))}
    </div>
  );
};

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [idCounter, setIdCounter] = useState(1);

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: idCounter, text: newComment, replies: [] },
      ]);
      setIdCounter(idCounter + 1);
      setNewComment('');
    }
  };

  const handleReply = (id, replyText) => {
    const addReply = (list) =>
      list.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              { id: idCounter, text: replyText, replies: [] },
            ],
          };
        } else {
          return { ...comment, replies: addReply(comment.replies) };
        }
      });

    setComments((prev) => addReply(prev));
    setIdCounter(idCounter + 1);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">📝 Nested Comment Section</h1>

      <textarea
        className="w-full border rounded p-2 mb-2"
        rows={3}
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        onClick={addComment}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Comment
      </button>

      <div className="mt-6">
        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet. Start the conversation!</p>
        )}
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} onReply={handleReply} />
        ))}
      </div>
    </div>
  );
}

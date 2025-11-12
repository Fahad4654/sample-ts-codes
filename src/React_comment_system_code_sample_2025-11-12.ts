import React, { useState } from 'react';

interface Comment {
  id: number;
  author: string;
  text: string;
}

const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => (
  <ul>
    {comments.map((comment) => (
      <li key={comment.id}>
        <b>{comment.author}:</b> {comment.text}
      </li>
    ))}
  </ul>
);

const CommentForm: React.FC<{ onCommentSubmit: (comment: Omit<Comment, 'id'>) => void }> = ({ onCommentSubmit }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCommentSubmit({ author, text });
    setAuthor('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Your Name" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <textarea placeholder="Your Comment" value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit">Add Comment</button>
    </form>
  );
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: 'John Doe', text: 'First comment!' },
  ]);

  const handleCommentSubmit = (newComment: Omit<Comment, 'id'>) => {
    setComments([...comments, { id: Date.now(), ...newComment }]);
  };

  return (
    <div>
      <h2>Comments</h2>
      <CommentList comments={comments} />
      <CommentForm onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default CommentSection;
// src/components/BlogPost.tsx
import React from 'react';

interface BlogPostProps {
  title: string;
  content: string;
  author: string;
  date: string;
  id: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, content, author, date, id }) => {
  return (
    <article key={id}>
      <h2>{title}</h2>
      <p>By {author} on {date}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default BlogPost;

// src/BlogContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: string, updatedPost: Omit<BlogPost, 'id'>) => void;
  deletePost: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

interface BlogProviderProps {
  children: ReactNode;
}

const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    setPosts([...posts, { ...post, id: crypto.randomUUID() }]);
  };

  const updatePost = (id: string, updatedPost: Omit<BlogPost, 'id'>) => {
    setPosts(posts.map(post => (post.id === id ? { ...post, ...updatedPost } : post)));
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const value: BlogContextType = { posts, addPost, updatePost, deletePost };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

export { BlogProvider, useBlog };

// src/components/PostList.tsx
import React from 'react';
import BlogPost from './BlogPost';
import { useBlog } from '../BlogContext';

const PostList: React.FC = () => {
  const { posts } = useBlog();

  return (
    <div>
      {posts.map(post => (
        <BlogPost key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostList;
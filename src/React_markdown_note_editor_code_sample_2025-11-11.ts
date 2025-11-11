import React, { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ initialValue = '', onChange }) => {
  const [markdown, setMarkdown] = useState(initialValue);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMarkdown(newValue);
    onChange?.(newValue);
  }, [onChange]);

  return (
    <div style={{ display: 'flex', height: '400px' }}>
      <textarea
        style={{ flex: 1, margin: '10px', padding: '5px', border: '1px solid #ccc', resize: 'none' }}
        value={markdown}
        onChange={handleInputChange}
      />
      <div style={{ flex: 1, margin: '10px', padding: '5px', border: '1px solid #ccc', overflowY: 'auto' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={okaidia}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
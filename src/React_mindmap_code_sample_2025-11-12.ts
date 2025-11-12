import React, { useState } from 'react';

interface Node {
  id: string;
  label: string;
  children: Node[];
}

const initialData: Node = {
  id: 'root',
  label: 'React Mindmap',
  children: [
    { id: 'comp', label: 'Components', children: [{ id: 'func', label: 'Functional', children: [] }, { id: 'class', label: 'Class', children: [] }] },
    { id: 'state', label: 'State Management', children: [{ id: 'useState', label: 'useState', children: [] }, { id: 'redux', label: 'Redux', children: [] }] },
  ],
};

const NodeComponent: React.FC<{ node: Node }> = ({ node }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ margin: '5px', border: '1px solid #ccc', padding: '5px' }}>
      <div onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
        {node.label} {node.children.length > 0 ? (expanded ? '-' : '+') : ''}
      </div>
      {expanded && (
        <div style={{ paddingLeft: '10px' }}>
          {node.children.map((child) => (
            <NodeComponent key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <NodeComponent node={initialData} />
    </div>
  );
};

export default App;
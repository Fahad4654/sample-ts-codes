// src/components/MyComponent/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  name: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ name }) => {
  return (
    <div>
      Hello, {name}!
    </div>
  );
};

export default MyComponent;

// src/components/MyComponent/MyComponent.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders greeting', () => {
  render(<MyComponent name="Test" />);
  const greetingElement = screen.getByText(/Hello, Test!/i);
  expect(greetingElement).toBeInTheDocument();
});

// src/components/MyComponent/index.ts
export { default } from './MyComponent';

// src/App.tsx
import React from 'react';
import MyComponent from './components/MyComponent';

const App: React.FC = () => {
  return (
    <div>
      <MyComponent name="World" />
    </div>
  );
};

export default App;
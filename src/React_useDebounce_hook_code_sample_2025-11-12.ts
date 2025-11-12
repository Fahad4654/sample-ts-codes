import { useState, useEffect } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

// Example usage:
// import useDebounce from './useDebounce';
// import { useState } from 'react';

// function MyComponent() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const debouncedSearchTerm = useDebounce(searchTerm, 500);

//   useEffect(() => {
//     // Perform search using debouncedSearchTerm
//     console.log('Searching for:', debouncedSearchTerm);
//   }, [debouncedSearchTerm]);

//   return (
//     <input
//       type="text"
//       value={searchTerm}
//       onChange={(e) => setSearchTerm(e.target.value)}
//     />
//   );
// }

// export default MyComponent;
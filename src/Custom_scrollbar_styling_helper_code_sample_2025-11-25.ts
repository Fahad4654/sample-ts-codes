interface ScrollbarStyleOptions {
  thumbColor?: string;
  trackColor?: string;
  width?: string;
  borderRadius?: string;
}

const customScrollbar = (options: ScrollbarStyleOptions = {}) => {
  const { thumbColor = '#888', trackColor = '#f1f1f1', width = '5px', borderRadius = '4px' } = options;

  return `
    &::-webkit-scrollbar {
      width: ${width};
    }

    &::-webkit-scrollbar-track {
      background: ${trackColor};
    }

    &::-webkit-scrollbar-thumb {
      background: ${thumbColor};
      border-radius: ${borderRadius};
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  `;
};

export default customScrollbar;
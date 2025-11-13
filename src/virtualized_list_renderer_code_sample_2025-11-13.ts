interface ListItem {
  id: number;
  text: string;
}

interface VirtualizedListProps {
  items: ListItem[];
  itemHeight: number;
  visibleItemCount: number;
}

const VirtualizedList: React.FC<VirtualizedListProps> = ({ items, itemHeight, visibleItemCount }) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = React.useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollTop(scrollContainerRef.current.scrollTop);
    }
  };

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
  const endIndex = Math.min(items.length, startIndex + visibleItemCount);
  const visibleItems = items.slice(startIndex, endIndex);

  const totalHeight = items.length * itemHeight;
  const topPadding = startIndex * itemHeight;

  return (
    <div
      ref={scrollContainerRef}
      style={{ overflowY: 'scroll', height: visibleItemCount * itemHeight, position: 'relative' }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, width: '100%', paddingTop: topPadding }}>
        {visibleItems.map((item) => (
          <div key={item.id} style={{ height: itemHeight, borderBottom: '1px solid #eee' }}>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedList;
export default function IrregularGrids() {
  const columns = [
    { blocks: [200, 80, 100, 150], color: 'var(--color-primary)' },
    {
      blocks: [200, 80, 100, 150],
      color: '#FF450066',
    },
    {
      blocks: [200, 80, 100, 150],
      color: '#FF450099',
    },
    { blocks: [200, 80, 100, 150], color: 'var(--color-primary)' },
  ];

  return (
    <div className="mask-fade-y relative flex h-full items-center justify-center gap-4 overflow-hidden">
      {columns.map((col, colIdx) => {
        const isEven = colIdx % 2 === 0;

        const BlockSet = () => (
          <div className="flex flex-col gap-4 pb-4">
            {col.blocks.map((height, blockIdx) => (
              <div
                key={blockIdx}
                className="shrink-0 rounded-xl shadow-md"
                style={{
                  height: `${height}px`,
                  background: col.color,
                  opacity: 0.7 + (blockIdx % col.blocks.length) * 0.05,
                }}
              />
            ))}
          </div>
        );

        return (
          <div key={colIdx} className="relative h-full w-31">
            <div
              className={`flex flex-col ${isEven ? 'animate-col-up' : 'animate-col-down'}`}
            >
              <BlockSet />
              <BlockSet />
            </div>
          </div>
        );
      })}
    </div>
  );
}

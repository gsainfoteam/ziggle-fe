const IrregularGrid = () => {
  // Height data for the blocks
  const columns = [
    { blocks: [40, 100, 60, 80] },
    { blocks: [80, 120, 150, 60] },
    { blocks: [60, 50, 80, 100] },
    { blocks: [100, 80, 40, 120] },
  ];

  return (
    // min-h-screen is great, but ensure 'bg-white' matches your theme var if needed
    <div className="flex justify-center items-center bg-white gap-2">
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-4 w-31">
          {col.blocks.map((height, blockIdx) => (
            <div
              key={blockIdx}
              /* 1. Added your custom utility: animate-box-float 
                 2. Using your theme color: bg-primary
              */
              className="animate-box-float bg-primary rounded-xl shadow-md"
              style={{
                height: `${height}px`,
                // We keep these inline because they are dynamic/calculated
                animationDelay: `${(colIdx + blockIdx) * 0.2}s`,
                animationDuration: `${2.5 + (colIdx % 2)}s`,
                
                /* If you prefer the gradient over the solid bg-primary, 
                   keep the background line below. Otherwise, bg-primary 
                   from Tailwind will take over.
                */
                background: 'linear-gradient(to bottom, var(--color-primary), #feb47b)',
                opacity: 0.8 + (blockIdx * 0.05)
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default IrregularGrid;
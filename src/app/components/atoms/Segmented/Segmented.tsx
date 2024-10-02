import React from 'react';

interface SegmentedOption<T> {
  value: T;
  label?: string;
}

interface SegmentedProps<T> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (selected: T) => void;
}

const Segmented = <T extends string>({
  options,
  value: selected,
  onChange,
}: SegmentedProps<T>) => {
  return (
    <div className="inline-flex cursor-pointer overflow-hidden rounded-lg bg-[var(--grey)]">
      {options.map(({ value, label }) => {
        return (
          <button
            key={value}
            className={`flex-1 cursor-pointer appearance-none whitespace-nowrap border-none bg-none px-2.5 py-1.5 text-center transition-colors duration-150 ${
              value === selected
                ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary)]'
                : 'hover:bg-[var(--greyBorder)]'
            } ${
              value !== options[options.length - 1].value
                ? 'border-r border-[var(--greyBorder)]'
                : ''
            }`}
            onClick={() => onChange(value)}
          >
            {label ?? value}
          </button>
        );
      })}
    </div>
  );
};

export default Segmented;

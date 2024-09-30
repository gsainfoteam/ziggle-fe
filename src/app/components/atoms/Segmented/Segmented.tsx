import styles from './segmented.module.css';

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
    <div className={styles.segmented}>
      {options.map(({ value, label }) => {
        return (
          <button
            key={value}
            className={value === selected ? styles.selected : ''}
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

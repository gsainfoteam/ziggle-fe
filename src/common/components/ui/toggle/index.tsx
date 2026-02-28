import type { ChangeEvent } from 'react';

import styles from './toggle.module.css';

interface ToggleProps {
  isSwitched: boolean;
  onSwitch: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const Toggle = ({ isSwitched, onSwitch, disabled }: ToggleProps) => {
  return (
    <label className={styles.wrapper}>
      <input
        role="switch"
        type="checkbox"
        className={styles.checkbox}
        checked={isSwitched}
        onChange={onSwitch}
        disabled={disabled}
      />
    </label>
  );
};

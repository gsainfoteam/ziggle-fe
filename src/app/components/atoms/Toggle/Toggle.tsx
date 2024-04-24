import { ChangeEvent } from 'react';

import styles from './toggle.module.css';

interface ToggleProps {
  isSwitched: boolean;
  onSwitch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Toggle = ({ isSwitched, onSwitch }: ToggleProps) => {
  return (
    <label className={styles.wrapper}>
      <input
        role="switch"
        type="checkbox"
        className={styles.checkbox}
        checked={isSwitched}
        onChange={onSwitch}
      />
    </label>
  );
};

export default Toggle;

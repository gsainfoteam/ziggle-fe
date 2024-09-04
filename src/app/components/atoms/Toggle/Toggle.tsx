import { ChangeEvent } from 'react';

import styles from './toggle.module.css';

interface ToggleProps {
  isSwitched: boolean;
  defaultIsSwitched?: boolean;
  onSwitch: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Toggle = ({ isSwitched, defaultIsSwitched, onSwitch }: ToggleProps) => {
  return (
    <input
      role="switch"
      type="checkbox"
      className={styles.checkbox}
      checked={isSwitched}
      defaultChecked={defaultIsSwitched}
      onChange={onSwitch}
    />
  );
};

export default Toggle;

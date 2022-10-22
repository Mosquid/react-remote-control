import { FC } from "react";
import styles from "./style.module.scss";
import cx from "classnames";

export interface ToggleProps {
  onChange(active: boolean): void;
  active: boolean;
  label?: string;
}

const Toggle: FC<ToggleProps> = ({ onChange, active, label }) => {
  return (
    <div className={styles.root} onClick={() => onChange(!active)}>
      {label}
      <div
        className={cx(styles.button, {
          [styles.active]: active,
        })}
      >
        <div className={styles.led}></div>
      </div>
    </div>
  );
};

export default Toggle;

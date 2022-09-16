import { FC, ReactNode, MouseEvent } from "react";
import { BaseColors } from "../../interfaces/colors";
import styles from "./style.module.scss";
import cx from "classnames";

export interface ButtonProps {
  onPressIn(e: MouseEvent): void;
  onPressOut(e: MouseEvent): void;
  children?: ReactNode;
  color?: BaseColors;
}

const Button: FC<ButtonProps> = ({
  onPressIn,
  onPressOut,
  children,
  color,
}) => {
  return (
    <button
      className={cx(styles.root, { [styles.control]: !children })}
      style={{ backgroundColor: color }}
      onMouseDown={onPressIn}
      onMouseUp={onPressOut}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  color: BaseColors.green,
};

export default Button;

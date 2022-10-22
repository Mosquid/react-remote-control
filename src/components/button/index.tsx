import { FC, ReactNode, MouseEvent } from "react";
import { Colors } from "../../Theme";
import styles from "./style.module.scss";
import cx from "classnames";
import { Color } from "../../interfaces";

export interface ButtonProps {
  onPressIn(e: MouseEvent): void;
  onPressOut(e: MouseEvent): void;
  children?: ReactNode;
  color?: Color;
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
  color: Colors.green,
};

export default Button;

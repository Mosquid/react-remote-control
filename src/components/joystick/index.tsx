import { FC } from "react";
import { Joystick as JoyStick } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

const MAX_MOVE = 100;

export interface MoveObject {
  left: number;
  right: number;
}

interface JoystickProps {
  numberOfMotors?: number;
  onMove(move: MoveObject): void;
  onStart?(): void;
  onStop?(): void;
  disabled?: boolean;
}

const Joystick: FC<JoystickProps> = ({
  numberOfMotors,
  disabled,
  onMove,
  onStart,
  onStop,
}) => {
  if (numberOfMotors !== 2) {
    return <>Error: only 2 motors currently supported</>;
  }

  const handleMove = (event: IJoystickUpdateEvent) => {
    const { x, y } = event;

    let leftMotor = 0;
    let rightMotor = 0;

    const moveY = y ?? 0;
    const moveX = x ?? 0;
    const turn = moveX / MAX_MOVE;

    leftMotor = moveY / MAX_MOVE;
    rightMotor = moveY / MAX_MOVE;

    // moving forward
    if (moveY > 0) {
      // turning left
      if (turn < 0) {
        leftMotor = leftMotor - Math.abs(turn);
      } else {
        rightMotor = rightMotor - Math.abs(turn);
        // turning right
      }
    } else {
      // moving backward
      if (turn < 0) {
        rightMotor = rightMotor + Math.abs(turn);
      } else {
        leftMotor = leftMotor + Math.abs(turn);
      }
    }

    onMove({ left: leftMotor, right: rightMotor });
  };

  return (
    <>
      <JoyStick
        disabled={disabled}
        throttle={MAX_MOVE * 2}
        baseColor="black"
        stickColor="red"
        move={handleMove}
        stop={onStop}
        start={onStart}
        size={200}
      />
    </>
  );
};

Joystick.defaultProps = {
  /* 
    currently we only support the 2 motor setup
    for a robot just like this one:
    https://www.hackster.io/sherna-liew/sts-pi-roving-robot-f46637
  */
  numberOfMotors: 2,
};

export default Joystick;

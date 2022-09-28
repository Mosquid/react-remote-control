import { FC } from "react";
import { Joystick as JoyStick } from "react-joystick-component";
import { IJoystickUpdateEvent } from "react-joystick-component/build/lib/Joystick";

const MAX_MOVE = 50;

interface JoystickProps {
  numberOfMotors?: number;
}

const Joystick: FC<JoystickProps> = ({ numberOfMotors }) => {
  if (numberOfMotors !== 2) {
    return <>Error: only 2 motors currently supported</>;
  }

  const onStart = () => {
    //TODO: connect to websocket
  };

  const onMove = (event: IJoystickUpdateEvent) => {
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
        // turning right
        rightMotor = rightMotor - Math.abs(turn);
      }
    } else {
      // moving backward
      if (turn > 0) {
        rightMotor = rightMotor + Math.abs(turn);
      } else {
        leftMotor = leftMotor + Math.abs(turn);
      }
    }

    console.log({ leftMotor, rightMotor });
  };
  const onStop = () => {
    //TODO: close the connection
  };

  return (
    <>
      <JoyStick
        baseColor="black"
        stickColor="red"
        move={onMove}
        stop={onStop}
        start={onStart}
        size={100}
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

import LabeledSwitch from "@components/creation/utilities/LabeledSwitch";
import * as React from "react";
import { IQuadradicVoting } from "../../YesNo/Actions/QuadraticVoting";

interface IwQuadraticVoting extends IQuadradicVoting {
  set: (val: IQuadradicVoting) => void;
}

const QuadraticVoting: React.FC<IwQuadraticVoting> = (props) => {
  return (
    <LabeledSwitch
      small
      title={"Activate quadratic voting"}
      value={props.isActive}
      onChange={(val: boolean) => props.set({ isActive: val })}
    />
  );
};

export default QuadraticVoting;

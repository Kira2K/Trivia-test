import { ButtonDesignTypes } from "./ButtonDesignTypes";

export type ButtonProps = {
  text: string;
  colorType: ButtonDesignTypes;
  onClick: CallableFunction;
};

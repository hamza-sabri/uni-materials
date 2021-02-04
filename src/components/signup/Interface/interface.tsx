export type buttonAttrubite = {
  buttonType: string;
  name: string;
  className: string;
  value: string;
};

export type buttonInterface = {
  attrubite: buttonAttrubite;
  handelDecrement?: any;
  handelIncrement?: Function;
};

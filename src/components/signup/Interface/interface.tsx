export type buttonAttrubite = {
  buttonType: string;
  name: string;
  className: string;
  value: string;
};

export type buttonInterface = {
  attrubte: buttonAttrubite;
  handelDecrement?: any;
  handelIncrement?: any;
};

export type signDataType = {
  email: string;
  password: string;
  password2: string;
  firstName: string;
  lastName: string;
  phone?: string;
  unversityName: string;
  unversityLocation: string;
  majorName: string;
};
export type PageInterface = {
  handelChange: any;
  InputRef?: any;
  formData: signDataType;
};

import { buttonAttrubite, signDataType } from "../interface";

export const universityName = [
  "university",
  "PTUK",
  "Al-Quds Open University",
  "An-Najah University",
  "Birzeit University",
  "Al-Quds University",
  "Al-Khalel university",
  "Polytechnic University",
  "Al Azhar university",
  "al zaytona University",
];

export const universityPart = [
  "Nablus",
  "Tulkarm",
  "Qalqilya",
  "Ramallah",
  "Hebron",
  "Alaroub",
];

export const nextButton: buttonAttrubite = {
  className: "btn btn-primary button-details",
  buttonType: "button",
  value: "Next",
  name: "next",
};

export const prevButton: buttonAttrubite = {
  className: "btn btn-secondary button-details",
  buttonType: "button",
  value: "previous",
  name: "previous",
};

export const signUp: buttonAttrubite = {
  className: "btn btn-primary button-details",
  buttonType: "submit",
  value: "signup",
  name: "submit",
};

export const data: signDataType = {
  email: "",
  password: "",
  password2: "",
  firstName: "",
  lastName: "",
  phone: "",
  unversityName: "",
  unversityLocation: "",
  majorName: "",
};

import React, { useEffect } from "react";
import axios from "axios";

const FormValidationRules = () => {
  const stateSchema = {
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    password2: { value: "", error: "" },
    firstName: { value: "", error: "" },
    lastName: { value: "", error: "" },
    phone: { value: "", error: "" },
    uname: { value: "", error: "" },
    universityname: { value: "", error: "" },
    universitypart: { value: "", error: "" },
    mname: { value: "", error: "" },
  };

  const passwordValidation = [
    "Min 1 uppercase letter.",
    "Min 1 lowercase letter",
    "Min 1 special character",
    "Min 1 number.Min 8 characters",
    "Max 30 characters.",
  ];
  // Define your validationStateSchema
  // Note: validationStateSchema and stateSchema property
  // should be the same in-order validation works!
  const validationStateSchema = {
    firstName: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z\u0621-\u064A\u0660-\u0669]+$/,

        error: "يجب ان يحتوي على حروف ",
        properties: {
          filedname: "Fname",
        },
      },
    },
    lastName: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z\u0621-\u064A\u0660-\u0669]+$/,
        error: "يجب ان يحتوي على حروف  .",
        properties: {
          filedname: "Lname",
        },
      },
    },
    phone: {
      required: true,
      validator: {
        regEx: /^(\+)?([ 0-9]){10}$/,
        error: "phone must be from 0 -9 length 10 .",
        properties: {
          filedname: "phone",
        },
      },
    },

    email: {
      required: true,
      validator: {
        regEx: /\S+@\S+\.\S+/,
        error: "Please enter a valid email address like name@example.com .",
        properties: {
          filedname: "email",
        },
      },
    },

    password: {
      required: true,
      validator: {
        regEx: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
        error: (
          <ul>
            {passwordValidation.map((e) => {
              return <li>{e}</li>;
            })}
          </ul>
        ),
        properties: {
          filedname: "password",
        },
      },
    },

    password2: {
      required: true,
      validator: {
        regEx: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,

        error: (
          <ul>
            {passwordValidation.map((e) => {
              return <li>{e}</li>;
            })}
          </ul>
        ),
        properties: {
          filedname: "password2",
        },
      },
    },

    uname: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z\u0621-\u064A\u0660-\u0669]+$/,
        error: "يجب ان يحتوي على حروف فقط",
        properties: {
          filedname: "uname",
        },
      },
    },

    universityname: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z\u0621-\u064A\u0660-\u0669]+$/,
        error: "you must start with char",
        properties: {
          filedname: "universityname",
        },
      },
    },

    universitypart: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z\u0621-\u064A\u0660-\u0669]+$/,
        error: "",
        properties: {
          filedname: "universitypart",
        },
      },
    },

    mname: {
      required: true,
      validator: {
        regEx: /^[a-zA-Z\u0621-\u064A\u0660-\u0669]+$/,
        error: "يجب ادخال حروف فقط",
        properties: {
          filedname: "universitypart",
        },
      },
    },
  };

  const errorStyle = {
    color: "red",
    fontSize: "13px",
  };

  // this is after submiting the data here
  const onSubmitForm = (state: any) => {
    return JSON.stringify(state, null, 2);
  };

  return { errorStyle, validationStateSchema, stateSchema, onSubmitForm };
};

export default FormValidationRules;

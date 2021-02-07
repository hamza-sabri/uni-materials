import * as axios from "axios";

export type Credentials = {
  email: string;
  password: string;
};

export const onLogin = async (x: Credentials) => {


    // const existedUser: userCredentials = {
		// 	email: 'ahmad.badran.19999@gmail.com',
		// 	password: 'hamoz2000@@xX'
    // };
    
		// console.log(await signin(existedUser));


  // axios.default
  //   .post(
  //     "https://us-central1-uni-materials-412a2.cloudfunctions.net/webApi/users/signin",
  //     {
  //       email: x.email,
  //       password: x.password,
  //     }
  //   )
  //   .then(function (response) {
  //     console.log(response);
  //     const { token } = response.data;
  //     localStorage.setItem("token", token);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  // console.log(x);
};

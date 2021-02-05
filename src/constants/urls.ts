
// external urls
const rootURL:string = 'https://us-central1-uni-materials-412a2.cloudfunctions.net/webApi';

// routes
const signinRoute:string = '/users/signin';




// functions
const urlConcatenator = (seconderyPath: string[] | string): string => {
    return `${rootURL}${seconderyPath}`;
};

export { rootURL, signinRoute, urlConcatenator };

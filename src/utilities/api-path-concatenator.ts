// this file is only to connect the root URL with other paths

type concatenatorInterface = {
	rootURL: string;
	seconderyPath: string[] | string;
};

export const urlConcatenator = ({rootURL, seconderyPath}:concatenatorInterface): string => {
    return `${rootURL}${seconderyPath}`;
};

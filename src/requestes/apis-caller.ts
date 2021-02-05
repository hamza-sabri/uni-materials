// TODO complete this file and document it
const APIsCaller = async (api: any, data: any): Promise<any> => {
    try{
        // TODO get the token from the local storage and add it to the headers of the request?
        const response = await api(data);
        // TODO if the response status code is 403 then refresh the token and call the request again
        return response;
    }catch(err){
        console.log(err);
        return {err};
    }
};

export { APIsCaller };

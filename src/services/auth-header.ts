//check local storage for user item, if there is logged in user with access token return HTTP autorization header

type Headers = {
    Authorization?: string;
    // CORS
    ["Access-Control-Allow-Origin"]?: string;
}

export default function authHeader(): Headers{
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if(user && user.accessToken){
        return { 
            Authorization: user.accessToken,
            ["Access-Control-Allow-Origin"]: "*"
        };
    }else{
        return {
            ["Access-Control-Allow-Origin"]: "*"
        };
    }
}
//check local storage for user item, if there is logged in user with access token return HTTP autorization header

type Headers = {
    Authorization?: string;
}

export default function authHeader(): Headers{
    const token = localStorage.getItem("user");
    if(token){
        return { 
            Authorization: `Bearer ${token}`,
        };
    }else{
        return {};
    }
}
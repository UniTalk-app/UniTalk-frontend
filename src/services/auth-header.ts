//check local storage for user item, if there is logged in user with access token return HTTP autorization header

export default function authHeader(){
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if(user && user.accessToken){
        return { Authorization: user.accessToken};
    }else{
        return {};
    }
}
import axios from "axios";
import BackendAPI from "./backendAPI";
import authHeader from "./auth-header";

class AvatarService {
    async getAvatar(){
        try {
            const response = await axios.get(BackendAPI.userAvatar, { headers: authHeader(), responseType: "blob" });           
            
            return URL.createObjectURL(response.data);
        } catch (e) {
            console.log(e);
            return "";      // because of React.useEffect in UserProfile.tsx
        }
    }

    async postAvatar(image: FileList | null, changedAvatar: () => void){

        if (image == null) return;

        const fd = new FormData();
        fd.append("image", image[0]);
        
        try {
            const response = await axios.post(BackendAPI.userAvatar, fd, { headers: authHeader() });  

            changedAvatar();

            
            console.log(response);
        } catch (e) {
            console.log(e);
            //return "";      // because of React.useEffect in UserProfile.tsx
        }
    }

    async putAvatar(image: FileList | null, changedAvatar: () => void){

        if (image == null) return;

        const fd = new FormData();
        fd.append("image", image[0]);
        try {
            const response = await axios.put(BackendAPI.userAvatar, fd, { headers: authHeader() } );

            changedAvatar();
            
            console.log(response);
        } catch (e) {
            console.log(e);
            //return "";      // because of React.useEffect in UserProfile.tsx
        }
    }
}

export default new AvatarService();
import axios from "axios"

export const deleteToken = () => {
    axios.post('http://localhost:3300/auth/logout', {}, { withCredentials: true });

    // document.cookie = "auth_token=; expires=; path=/;";

}
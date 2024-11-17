export const deleteToken = () => {
    document.cookie = "auth_token=; expires=; path=/;";

}
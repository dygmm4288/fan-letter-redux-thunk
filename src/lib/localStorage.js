export const ACCESS_TOKEN = "access_token";

export function getItemWithLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setItemWithLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function getAccessTokenFromLocal() {
  return getItemWithLocalStorage(ACCESS_TOKEN);
}
export function setAccessTokenAtLocal(token) {
  return setItemWithLocalStorage(ACCESS_TOKEN, token);
}

export const ACCESS_TOKEN = "access_token";
export const USER_ID = "user_id";
export const NICKNAME = "nickname";
export const AVATAR_SRC = "avatar_src";

export function getItemWithLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
export function setItemWithLocalStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
function createStorageMethod() {
  return [ACCESS_TOKEN, USER_ID, NICKNAME, AVATAR_SRC]
    .map((key) => {
      return [
        () => getItemWithLocalStorage(key),
        (value) => setItemWithLocalStorage(key, value),
      ];
    })
    .flat();
}
export const [
  getAccessTokenFromLocal,
  setAccessTokenAtLocal,
  getUserIdFromLocal,
  setUserIdAtLocal,
  getNickNameFromLocal,
  setNickNameAtLocal,
  getAvatarSrcFromLocal,
  setAvatarSrcAtLocal,
] = createStorageMethod();

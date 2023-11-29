export default function localStorageMiddleware(key) {
  return (store) => (next) => (action) => {
    const result = next(action);
    if (action.type.includes("memberLetters")) {
      localStorage.setItem(
        key,
        JSON.stringify(store.getState().memberLettersReducer.memberLetters),
      );
    }
    return result;
  };
}

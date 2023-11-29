export default function createReducer(initialState, actionHandler) {
  return (state = initialState, action) => {
    const handler = actionHandler[action.type];
    if (!handler) return state;
    const result = handler(state, action?.payload);
    return { ...state, ...result };
  };
}

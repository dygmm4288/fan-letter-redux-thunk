import _ from "lodash";
export default function handleThunkStatus(actionName, thunk, callbacks = {}) {
  const { onSuccess, onError } = callbacks;
  return {
    [thunk.pending]: (state) => {
      return {
        ...state,
        ...pendingLoadingState(actionName),
      };
    },
    [thunk.fulfilled]: (state, action) => {
      return {
        ...state,
        ...fulfilledLoadingState(actionName),
        ...(_.isFunction(onSuccess) ? onSuccess(action.payload) : {}),
      };
    },
    [thunk.rejected]: (state, action) => {
      return {
        ...state,
        ...rejectedLoadingState(actionName, action.payload),
        ...(_.isFunction(onError) ? onError(action.payload) : {}),
      };
    },
  };
}

function pendingLoadingState(actionName) {
  return {
    [`is${actionName}Loading`]: true,
    [`is${actionName}Error`]: false,
    [`is${actionName}Success`]: false,
    [`${actionName.slice(0, 1).toLowerCase(0) + actionName.slice(1)}Error`]:
      null, // to CamelCase
  };
}

function fulfilledLoadingState(actionName) {
  return {
    [`is${actionName}Loading`]: false,
    [`is${actionName}Success`]: true,
  };
}

function rejectedLoadingState(actionName, error) {
  return {
    [`is${actionName}Loading`]: false,
    [`is${actionName}Error`]: true,
    [`${actionName.slice(0, 1).toLowerCase(0) + actionName.slice(1)}Error`]:
      error,
  };
}

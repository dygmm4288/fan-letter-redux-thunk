import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jsonServerInstance from "api/serverInstance";
import {
  ACCESS_TOKEN,
  AVATAR_SRC,
  NICKNAME,
  USER_ID,
  getItemFromLocalStorage,
  setAccessTokenAtLocal,
  setAvatarSrcAtLocal,
  setNickNameAtLocal,
  setUserIdAtLocal,
} from "lib/localStorage";
import { authServerInstance } from "../../api/serverInstance";
import handleThunkStatus from "./handleThunkStatus";
const SIGN_UP = "SignUp";
const LOG_IN = "LogIn";
const UPDATE_PROFILE = "UpdateProfile";

const createActionLoadingState = (actionName) => {
  return {
    [`is${actionName}Loading`]: false,
    [`is${actionName}Error`]: false,
    [`is${actionName}Success`]: false,
    [`${actionName.slice(0, 1).toLowerCase(0) + actionName.slice(1)}Error`]:
      null, // to CamelCase
  };
};

const initialLoadingState = {
  ...createActionLoadingState(SIGN_UP),
  ...createActionLoadingState(LOG_IN),
  ...createActionLoadingState(UPDATE_PROFILE),
};
const initialState = {
  userId: getItemFromLocalStorage(USER_ID),
  avatar: getItemFromLocalStorage(AVATAR_SRC),
  nickname: getItemFromLocalStorage(NICKNAME),
  isLogin: !!getItemFromLocalStorage(ACCESS_TOKEN),

  ...initialLoadingState,
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      const response = await authServerInstance.post("/register", {
        id: payload.id,
        password: payload.password,
        nickname: payload.nickname,
      });

      if (response.data.success) {
        return response.data;
      }
      return thunkAPI.rejectWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const logInThunk = createAsyncThunk(
  "auth/log-in",
  async (payload, thunkAPI) => {
    try {
      const response = await authServerInstance.post("/login", {
        id: payload.id,
        password: payload.password,
      });
      const { accessToken, userId, success, avatar, nickname } = response.data;
      if (success) {
        return { accessToken, userId, avatar, nickname };
      }
      return thunkAPI.rejectWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const updateProfileThunk = createAsyncThunk(
  "auth/update-profile",
  async (payload, thunkAPI) => {
    const [accessToken, userId] = getItemFromLocalStorage([
      ACCESS_TOKEN,
      USER_ID,
    ]);
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken}`,
    };
    const { avatar, nickname } = payload;
    try {
      const response = await authServerInstance.patch(
        "/profile",
        {
          avatar,
          nickname,
        },
        { headers },
      );
      if (response.data.success) {
        const body = { ...response.data };

        delete body.success;
        delete body.message;

        await jsonServerInstance.patch(`/letters/profile/${userId}`, body);
        return response.data;
      }
      return thunkAPI.rejectWithValue(response.data);
    } catch (error) {
      thunkAPI.dispatch(signOut(error.response.data.message));
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state, action) => {
      state.isLogin = false;
      if (action.payload) state.logInError = action.payload;
      setAccessTokenAtLocal(null);
    },
    clearLoadingState: (state) => {
      return {
        ...state,
        ...initialLoadingState,
      };
    },
  },
  extraReducers: {
    // TODO : 여기 반복이 많은데 이거 줄일 수 있지 않을까?
    // ? 일단 모듈로 변경을 했는데 이렇게 하면 reducer에 대해서 한눈에 알아보기는 쉬울텐데
    // ? 과연 좋은 판단일까? 내 요점은 관심사의 분리.... 근데 이 파일이 과연 관심사의 분리를 한게 맞을 까?
    ...handleThunkStatus(SIGN_UP, registerThunk),

    ...handleThunkStatus(LOG_IN, logInThunk, {
      onSuccess: (payload) => {
        const { accessToken, userId, avatar, nickname } = payload;

        setAccessTokenAtLocal(accessToken);
        setUserIdAtLocal(userId);
        setNickNameAtLocal(nickname);
        setAvatarSrcAtLocal(avatar);

        return {
          userId,
          avatar,
          nickname,
          isLogin: true,
        };
      },
      onError: () => {
        setAccessTokenAtLocal(null);
        setUserIdAtLocal(null);
        setNickNameAtLocal(null);
        setAvatarSrcAtLocal(null);
      },
    }),

    ...handleThunkStatus(UPDATE_PROFILE, updateProfileThunk, {
      onSuccess: (payload) => {
        const nextState = {};
        if (payload?.nickname) nextState.nickname = payload.nickname;
        if (payload?.avatar) nextState.avatar = payload.avatar;
        return nextState;
      },
    }),
  },
});

export const { signOut, clearLoadingState } = authSlice.actions;

export const selectAuth = (store) => store.authReducer;

export default authSlice.reducer;

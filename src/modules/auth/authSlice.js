import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getAccessTokenFromLocal,
  getAvatarSrcFromLocal,
  getNickNameFromLocal,
  getUserIdFromLocal,
  setAccessTokenAtLocal,
} from "lib/localStorage";
import handleLoginThunk from "./handleLoginThunk";
import handleRegisterThunk from "./handleRegisterThunk";
// TODO: 더 줄일 수 있나 ? 이게 최선인가?
const initialState = {
  userId: getUserIdFromLocal(),
  avatar: getAvatarSrcFromLocal(),
  nickname: getNickNameFromLocal(),

  isLogin: getAccessTokenFromLocal() ? true : false,

  isSignUpLoading: false,
  isSignUpError: false,
  isSignUpSuccess: false,
  signUpError: null,

  isLogInLoading: false,
  isLogInError: false,
  logInError: null,
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload, thunkAPI) => {
    const response = await axios.post(
      process.env.REACT_APP_AUTH_URL + "/register",
      {
        id: payload.id,
        password: payload.password,
        nickname: payload.nickname,
      },
    );
    if (response.data.success) {
      return response.data;
    }
    thunkAPI.rejectWithValue(response.data);
  },
);

export const logInThunk = createAsyncThunk(
  "auth/logIn",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_AUTH_URL + "/login",
        {
          id: payload.id,
          password: payload.password,
        },
      );
      const { accessToken, userId, success, avatar, nickname } = response.data;
      if (success) {
        return { accessToken, userId, avatar, nickname };
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.isLogin = false;
      setAccessTokenAtLocal(null);
    },
  },
  extraReducers: {
    // TODO : 여기 반복이 많은데 이거 줄일 수 있지 않을까?
    // ? 일단 모듈로 변경을 했는데 이렇게 하면 reducer에 대해서 한눈에 알아보기는 쉬울텐데
    // ? 과연 좋은 판단일까? 내 요점은 관심사의 분리.... 근데 이 파일이 과연 관심사의 분리를 한게 맞을 까?
    ...handleRegisterThunk(registerThunk),
    ...handleLoginThunk(logInThunk),
  },
});

export const { signOut } = authSlice.actions;

export const selectAuth = (store) => store.authReducer;

export default authSlice.reducer;

import Login from "components/auth/Login";
import SignUp from "components/auth/SignUp";
import Profile from "components/profile/Profile";
import { selectAuth } from "modules/auth/authSlice";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Detail from "./Detail";
import Home from "./Home";
import Layout from "./Layout";

export default function Router() {
  const { isLogin } = useSelector(selectAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={isLogin ? <Layout /> : <Navigate to='login' />}>
          <Route path='/' element={<Home />} />
          <Route path='/details/:id' element={<Detail />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

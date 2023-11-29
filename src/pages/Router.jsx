import Login from "components/auth/Login";
import SignUp from "components/auth/SignUp";
import { selectAuth } from "modules/auth/authSlice";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout";

export default function Router() {
  const { isLogin } = useSelector(selectAuth);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={isLogin ? <Layout /> : <Navigate to='login' />}>
          <Route path='/' element={<div>Home</div>} />
          <Route path='/details/:id' element={<div>상세화면</div>} />
        </Route>
        <Route path='/register' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

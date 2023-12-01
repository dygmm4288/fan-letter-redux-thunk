import Modal from "components/common/modal/Modal";
import { signOut } from "modules/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

export default function Layout() {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <>
      <StHeader>
        <Link to='/'>Home</Link>
        <StUserProfileContainer>
          <Link to='/profile'>내 프로필</Link>
          <span onClick={handleSignOut}>로그아웃</span>
        </StUserProfileContainer>
      </StHeader>
      <Outlet />
      <Modal />
    </>
  );
}

const StHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 1rem;

  background-color: gray;

  a,
  span {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover,
  span:hover {
    color: yellow;
    font-weight: bold;
  }
`;
const StUserProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

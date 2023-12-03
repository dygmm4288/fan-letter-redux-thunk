import Avatar from "components/common/Avatar";
import StyledButton from "components/common/Button";
import useInput from "components/hooks/useInput";
import { selectAuth, updateProfileThunk } from "modules/auth/authSlice";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import defaultAvatar from "../../assets/img/default-avatar.png";

export default function Profile() {
  const { userId, nickname, avatar } = useSelector(selectAuth);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [editedNickName, handleEditedNickName] = useInput(nickname);
  const [avatarSrc, setAvatarSrc] = useState(avatar || defaultAvatar);
  const [isDisabled, setIsDisabled] = useState(true);

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  const handleChangeDisabled = (event) => {
    if (
      (event.target.name === "avatar" && event.target.value !== avatar) ||
      (event.target.name === "nickname" && event.target.value !== nickname)
    ) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const newUserProfile = {};

    // 프로필 이미지가 변경 됐을 경우
    if (avatarSrc !== avatar) {
      newUserProfile["avatar"] = inputRef.current.files[0];
    }
    // 닉네임이 변경됐을 경우
    if (nickname !== editedNickName) {
      newUserProfile["nickname"] = editedNickName;
    }

    dispatch(updateProfileThunk(newUserProfile));

    handleToggleEditingMode();
  };

  const handleUploadInputImgFile = (event) => {
    const file = event.currentTarget.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleEditingMode = () => {
    setIsEditingMode((prevEditingMode) => !prevEditingMode);
  };

  const handleOpenFileSystem = () => {
    inputRef.current.click();
  };

  return (
    <StWrapper>
      <StProfileWrapper
        onChange={handleChangeDisabled}
        onSubmit={handleUpdateProfile}>
        <h1>프로필 관리</h1>
        <Avatar src={avatarSrc} onClick={handleOpenFileSystem} />
        <StFileInput
          type='file'
          name='avatar'
          ref={inputRef}
          onChange={handleUploadInputImgFile}
          disabled={!isEditingMode}
        />
        {!isEditingMode ? (
          <h3>{nickname}</h3>
        ) : (
          <input
            value={editedNickName}
            name='nickname'
            placeholder='아이디 (4~10글자)'
            onChange={handleEditedNickName}
          />
        )}

        <p>{userId}</p>
        {!isEditingMode ? (
          <StyledButton type={"button"} onClick={handleToggleEditingMode}>
            수정하기
          </StyledButton>
        ) : (
          <StButtonContainer>
            <StyledButton type={"button"} onClick={handleToggleEditingMode}>
              취소
            </StyledButton>
            <StyledButton type={"submit"} disabled={isDisabled}>
              수정완료
            </StyledButton>
          </StButtonContainer>
        )}
      </StProfileWrapper>
    </StWrapper>
  );
}

const StWrapper = styled.div`
  height: 100vh;

  display: flex;
  > * {
    margin: auto;
  }
`;
const StProfileWrapper = styled.form`
  width: 450px;
  height: 300px;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  background-color: lightgray;

  border-radius: 1.5rem;

  text-align: center;
  h1 {
    font-size: 2rem;
  }

  img {
    margin: 0 auto;
  }
`;
const StButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
`;

const StFileInput = styled.input`
  display: none;
`;

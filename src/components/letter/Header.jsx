import members from "data/members";
import { selectMemberName, setSelectedMemberName } from "modules/letterSlice";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import aespa from "../../assets/img/aespa.jpg";

export default function Header() {
  const selectedMemberName = useSelector(selectMemberName);
  const dispatch = useDispatch();

  const handleSelectMember = (memberName) => () => {
    dispatch(setSelectedMemberName(memberName));
  };

  return (
    <StyledHeader>
      <h1>에스파 팬레터 콜렉션</h1>
      <nav>
        <StyledNavList>
          {members.map(({ name: memberName }) => (
            <StyledNavListItem
              key={memberName}
              onClick={handleSelectMember(memberName)}
              $selectedMember={selectedMemberName === memberName}>
              {memberName}
            </StyledNavListItem>
          ))}
        </StyledNavList>
      </nav>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  height: 300px;
  background: url(${aespa});

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

  h1 {
    color: yellow;
    font-size: 3.5rem;
  }
  nav {
    position: absolute;
    bottom: 1rem;
  }
`;
const StyledNavList = styled.ul`
  display: flex;
  flex-direction: row;

  background-color: gray;
  border: 1px solid white;

  gap: 1.5rem;

  padding: 1rem;

  border-radius: 0.5rem;
`;
const StyledNavListItem = styled.li`
  background-color: ${(props) => (props.$selectedMember ? "yellow" : "black")};
  color: ${(props) => (props.$selectedMember ? "black" : "white")};
  border-radius: 0.5rem;
  padding: 0.5rem 2rem;
  border: 1px solid black;

  &:hover {
    background-color: yellow;
    color: black;
  }
`;

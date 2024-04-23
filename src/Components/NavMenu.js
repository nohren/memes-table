import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-evenly;
`;
const MenuItem = styled.div`
  cursor: pointer;
  color: white;
  &:hover {
    color: gold;
  }
`;

export default function NavMenu(props) {
  const navigate = useNavigate();
  const { menuItems } = props;
  return (
    <NavContainer>
      {menuItems.map((item) => (
        <MenuItem key={item}>
          <div onClick={() => navigate(item.toLowerCase())}>{item}</div>
        </MenuItem>
      ))}
    </NavContainer>
  );
}

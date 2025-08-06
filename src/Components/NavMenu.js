import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
  display: flex;
`;
const MenuItem = styled.div`
  cursor: pointer;
  color: white;
  margin: 0 0.75rem;
  font-weight: 500;
  opacity: 0.9;

  &:hover {
    color: darkturquoise;
  }
`;

export default function NavMenu(props) {
  const navigate = useNavigate();
  const { menuItems } = props;
  return (
    <NavContainer>
      {menuItems.map((item) => (
        <MenuItem key={item.name}>
          <div onClick={() => navigate(item.path)}>{item.name}</div>
        </MenuItem>
      ))}
    </NavContainer>
  );
}

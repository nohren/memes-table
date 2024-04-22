import React from 'react';
import styled from 'styled-components';

const NavContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-evenly;
`;
const MenuItem = styled.div`
  cursor: pointer;
`;

export default function NavMenu(props) {
  return (
    <NavContainer>
      <MenuItem>Home</MenuItem>
      <MenuItem>Recipes</MenuItem>
      <MenuItem>Sample Holiday Menu's</MenuItem>
      <MenuItem>About</MenuItem>
    </NavContainer>
  );
}

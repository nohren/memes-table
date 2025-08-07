import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
  display: flex;
`;
export const ClickableElement = styled.div`
  cursor: pointer;
  color: white;
  opacity: 0.9;

  &:hover {
    color: darkturquoise;
  }
`;

const Spacing = styled.div`
  margin: 0 0.75rem;
`;

export default function NavMenu(props) {
  const navigate = useNavigate();
  const { menuItems } = props;
  return (
    <NavContainer>
      {menuItems.map((item) => (
        <Spacing key={item.name}>
          <ClickableElement key={item.name}>
            <div onClick={() => navigate(item.path)}>{item.name}</div>
          </ClickableElement>
        </Spacing>
      ))}
    </NavContainer>
  );
}

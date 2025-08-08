import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ClickableElement } from '../utils/sharedCSS'; // Adjust the import path as necessary

const NavContainer = styled.div`
  display: flex;
`;

const Spacing = styled.div`
  margin: 0 0.75rem;
  font-size: 1.5rem;
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

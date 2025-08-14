import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ClickableElement } from '../utils/sharedCSS';

const NavContainer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const NavItem = styled(ClickableElement)`
  padding: 8px 14px;
  border-radius: 9999px;
  background: radial-gradient(
      100% 100% at 50% 0,
      rgba(255, 255, 255, 0.12),
      rgba(255, 255, 255, 0.04)
    ),
    rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #eaf6ff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: transform 0.15s ease, background 0.3s ease, color 0.3s ease,
    box-shadow 0.3s ease, border-color 0.3s ease;
  user-select: none;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: translateY(-1px);
    background: linear-gradient(
      180deg,
      rgba(102, 227, 255, 0.15),
      rgba(102, 227, 255, 0.05)
    );
    border-color: rgba(102, 227, 255, 0.35);
    color: #66e3ff;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }
`;

export default function NavMenu(props) {
  const navigate = useNavigate();
  const { menuItems } = props;

  return (
    <NavContainer>
      {menuItems.map((item) => (
        <NavItem
          key={item.name}
          onClick={() => navigate(item.path)}
          role="button"
          tabIndex={0}
        >
          {item.name}
        </NavItem>
      ))}
    </NavContainer>
  );
}

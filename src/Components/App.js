import '../index.css';
import React from 'react';
import styled from 'styled-components';
import NavMenu from './NavMenu';
import { Outlet } from 'react-router-dom';
import { menuItems } from '../store/store';

const AppContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: clamp(12px, 2vw, 24px);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  gap: 12px;
`;

const Brand = styled.h1`
  margin: 0;
  font-weight: 800;
  letter-spacing: 0.3px;
  font-size: clamp(1.25rem, 3vw, 2.25rem);
  background: linear-gradient(90deg, #ffffff, #66e3ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 1px rgba(255, 255, 255, 0.2);
`;

const Construction = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  margin-left: 8px;
  font-size: 0.65em;
  border-radius: 999px;
  color: #0a1a24;
  background: linear-gradient(180deg, #fbf2c0, #e8d889);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35),
    0 2px 8px rgba(0, 0, 0, 0.25);
`;

const NavBar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 10px 14px;
  border-radius: 12px;
  backdrop-filter: saturate(130%) blur(10px);
  -webkit-backdrop-filter: saturate(130%) blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  margin: 12px 0 16px;
`;

const Hero = styled.section`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: clamp(240px, 45vh, 420px);
  background: ${({ $url }) =>
    `linear-gradient(180deg, rgba(0,0,0,0) 10%, rgba(12,24,32,0.6) 80%), url('${$url}') center/cover no-repeat`};
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
  outline: 1px solid rgba(255, 255, 255, 0.06);
`;

const ViewContainer = styled.main`
  margin-top: 24px;
`;

export default function App() {
  return (
    <AppContainer>
      <Header>
        <Brand>
          Voices of Mimouna{' '}
          <Construction>Page under construction 🚧</Construction>
        </Brand>
      </Header>
      <NavBar>
        <NavMenu menuItems={menuItems} />
      </NavBar>
      <Hero $url={'./assets/images/memes-table.jpeg'} />
      <ViewContainer>
        <Outlet context={{ theme: 'light' }} />
      </ViewContainer>
    </AppContainer>
  );
}

import '../index.css';
import React from 'react';
import styled from 'styled-components';
import NavMenu from './NavMenu';
import SearchBox from './SearchBox';
import { Outlet } from 'react-router-dom';
import { menuItems } from '../store/store';

const AppContainer = styled.div``;
const ViewContainer = styled.div``;
const Centered = styled.h1`
  text-align: center;
  border-bottom: 1px solid white;
`;
const Menu = styled.div`
  display: flex;
`;

export default function App() {
  return (
    <AppContainer>
      <Centered>Meme's Table</Centered>
      <Menu>
        <NavMenu menuItems={menuItems} />
        <SearchBox />
      </Menu>
      <ViewContainer>
        <Outlet />
      </ViewContainer>
    </AppContainer>
  );
}

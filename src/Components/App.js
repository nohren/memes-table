import '../index.css';
import React from 'react';
import styled from 'styled-components';
import NavMenu from './NavMenu';
import SearchBox from './SearchBox';
import { Outlet } from 'react-router-dom';
import { menuItems } from '../store/store';

const AppContainer = styled.div``;
const BackgroundImageContainer = styled.div`
  background-image: url('https://github.com/nohren/memes-table/blob/main/images/memes-table.jpeg?raw=true');
  background-size: cover;
  background-position: center;
  height: 250px;
`;
const ViewContainer = styled.div``;
const Centered = styled.h1`
  text-align: center;
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
      <BackgroundImageContainer></BackgroundImageContainer>
      <ViewContainer>
        <Outlet />
      </ViewContainer>
    </AppContainer>
  );
}

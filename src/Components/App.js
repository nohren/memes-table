import '../index.css';
import React from 'react';
import styled from 'styled-components';
import NavMenu from './NavMenu';
import { Outlet } from 'react-router-dom';
import { menuItems } from '../store/store';

const AppContainer = styled.div``;
const BackgroundImageContainer = styled.div`
  background-image: url('${({ url }) => url}');
  background-size: cover;
  background-position: center;
  height: 250px;
  filter: drop-shadow(1px 10px 9px black);
`;
const BackgroundContainerBottom = styled.div`
  background: linear-gradient(to top, #1c2e3b, transparent),
    linear-gradient(to bottom, aqua, transparent);
  background-position: top, bottom;
  height: 100px;
`;

const BackgroundContainerTop = styled.div`
  background: linear-gradient(to bottom, #1c2e3b, transparent),
    linear-gradient(to top, aqua, transparent);
  background-position: top, bottom;
  height: 100px;
`;

const ViewContainer = styled.div``;
const Centered = styled.h1`
  text-align: center;
`;
const Menu = styled.div`
  display: flex;
`;

const Construction = styled.div`
  color: yellow;
  font-size: 0.5em;
  margin-top: 20px;
`;

export default function App() {
  return (
    <AppContainer>
      <Centered>
        Assouli Kitchen
        <Construction>Page under construction 🚧</Construction>
      </Centered>
      <Menu>
        <NavMenu menuItems={menuItems} />
        {/* <SearchBox /> */}
      </Menu>
      <BackgroundContainerTop></BackgroundContainerTop>
      <BackgroundImageContainer
        url={'./assets/images/memes-table.jpeg'}
      ></BackgroundImageContainer>
      <BackgroundContainerBottom></BackgroundContainerBottom>
      <ViewContainer>
        <Outlet context={{ theme: 'light' }} />
      </ViewContainer>
    </AppContainer>
  );
}

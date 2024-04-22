import React from 'react';
import styled from 'styled-components';
import '../index.css';
import NavMenu from './NavMenu';
import SearchBox from './SearchBox';

const AppContainer = styled.div``;
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
        <NavMenu />
        <SearchBox />
      </Menu>
    </AppContainer>
  );
}

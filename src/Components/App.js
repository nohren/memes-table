import '../index.css';
import React from 'react';
import styled from 'styled-components';
import NavMenu from './NavMenu';
import SearchBox from './SearchBox';
import { Outlet } from 'react-router-dom';

const AppContainer = styled.div``;
const ViewContainer = styled.div``;
const Centered = styled.h1`
  text-align: center;
  border-bottom: 1px solid white;
`;
const Menu = styled.div`
  display: flex;
`;

/**
 * Routing architecture
 * Initial load we land on home page, clicking on other apps we change route
 *
 * Home is the root page.
 *
 * Questions to answer
 *
 * How to switch pages via click?
 *
 * add an outlet here for rendering the components
 *
 */

//needs work to describe routes, should be name and path
const menuItems = ['Home', 'Recipes', "Sample Holiday Menu's", 'About'];

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

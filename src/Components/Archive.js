import React from 'react';
import recipes from '../store/dummy_recipes.json';
import styled from 'styled-components';
import { ClickableElement } from './NavMenu';
import { Link } from 'react-router-dom';

const RecipeLink = styled(Link)`
  text-decoration: none; /* remove underline */
  color: inherit; /* use parent text color */
`;

//TODO
// Display a list of recipes from the archive using recipe.id as key
// clicking on any recipe redirects to the recipe detail page
//set the recipe in react router state and navigate to RecipeDetails component

export default function Archive(props) {
  return <div>archive page</div>;
}

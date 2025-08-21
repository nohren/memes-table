import React from 'react';
import recipes from '../store/dummy_recipes.json';
import { TextContainer } from './../utils/sharedCSS';
import styled from 'styled-components';
import { ClickableElement } from './NavMenu';
import { Link } from 'react-router-dom';
import { parseTime } from './../utils/Utilities'; 
import { useLocation } from 'react-router-dom';

export default function Archive() {
  const location = useLocation()
  const { RecipeDetail } = location.state || {};
  const RecipeLink = styled(Link)`

  text-decoration: none; /* remove underline */
  color: inherit; /* use parent text color */
`;

/*TODO
// Display a list of recipes from the archive using recipe.id as key
// clicking on any recipe redirects to the recipe detail page
//set the recipe in react router state and navigate to RecipeDetails component
*/

  return (
    <div>
      {recipes.map((recipe) => (
        <TextContainer key={recipe.id}>
          <RecipeLink
            to={`/recipe/${recipe.id}`}
            state={{ recipe }} 
          >
            <div>{recipe.title}</div>
            <div>{recipe.author}</div>
            <div>{recipe.description}</div>
            <div>Total time: {parseTime(recipe.prep_time) + parseTime(recipe.cook_time)} minutes</div>
          </RecipeLink>
        </TextContainer>
      ))}
    </div>
  );
}

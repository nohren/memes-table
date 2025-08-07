import React from 'react';
import recipes from '../store/recipes.json';
import styled from 'styled-components';
import { ClickableElement } from './NavMenu';
import { Link } from 'react-router-dom';

export const RecipeLink = styled(Link)`
  text-decoration: none; /* remove underline */
  color: inherit; /* use parent text color */
`;

//TODO
//click, identify recipe id
//set that in state and navigate to RecipeDetails component

export default function Archive(props) {
  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <RecipeLink
            to={`/recipe/${recipe.id}`}
            state={{ recipe }} // 👈 pass full data
          >
            <ClickableElement>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
            </ClickableElement>
          </RecipeLink>
        </div>
      ))}
    </div>
  );
}

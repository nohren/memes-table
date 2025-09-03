import React from 'react';
import recipes from '../store/dummy_recipes.json';
import { TextContainer } from './../utils/sharedCSS';
import styled from 'styled-components';
import { ClickableElement } from './NavMenu';
import { Link } from 'react-router-dom';
import { parseTime } from '../utils/utilities';
import { useLocation } from 'react-router-dom';

export default function Archive() {
  const location = useLocation();
  const { state } = location?.state ?? {};
  const RecipeLink = styled(Link)`
    text-decoration: none; /* remove underline */
    color: inherit; /* use parent text color */
    
    &:hover {
      text-decoration: underline; 
      color: var(--accent);
    }
  `;

  const RecipeCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `;

  const RecipeTitle = styled.div`
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--fg);
    margin-bottom: 4px;
  `;

  const RecipeMeta = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    margin: 8px 0;
  `;

  const MetaItem = styled.span`
    background: rgba(255, 255, 255, 0.08);
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 13px;
    color: var(--accent);
    font-weight: 500;
  `;

  const RecipeDescription = styled.div`
    color: var(--fg);
    opacity: 0.8;
    font-size: 0.95rem;
    line-height: 1.4;
    margin: 4px 0;
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
          <RecipeLink to={`/recipe/${recipe.id}`} state={{ ...state, recipe }}>
            <RecipeCard>
              <RecipeTitle>{recipe.title}</RecipeTitle>
              
              <RecipeMeta>
                {recipe.author && <MetaItem>By {recipe.author}</MetaItem>}
                <MetaItem>
                  {parseTime(recipe.prep_time) + parseTime(recipe.cook_time)} min
                </MetaItem>
              </RecipeMeta>
              
              {recipe.description && (
                <RecipeDescription>{recipe.description}</RecipeDescription>
              )}
            </RecipeCard>
          </RecipeLink>
        </TextContainer>
      ))}
    </div>
  );
}

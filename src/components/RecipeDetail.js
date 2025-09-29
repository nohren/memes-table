import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { TextContainer } from '../utils/sharedCSS';
import { parseTime } from '../utils/utilities';

// Styled Components
const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--fg);
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 20px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--accent);
  }
`;

const RecipeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: var(--fg);
`;

const RecipeImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin: 0 auto 20px auto;
  display: block;
`;

const RecipeMeta = styled.div`
  display: flex;
  gap: 16px;
  margin: 20px 0;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  background: rgba(255, 255, 255, 0.08);
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-size: 14px;

  .label {
    color: var(--accent);
    font-weight: 500;
    margin-right: 6px;
  }

  .value {
    color: var(--fg);
    font-weight: 400;
  }
`;

const RecipeDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--fg);
  opacity: 0.9;
  margin: 20px 0;
  font-style: italic;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--accent);
  margin: 30px 0 15px 0;
`;

const IngredientList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const IngredientItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const StepList = styled.ol`
  padding-left: 20px;
  margin: 0;
`;

const StepItem = styled.li`
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

const ErrorTitle = styled.h2`
  color: var(--accent);
  margin-bottom: 16px;
`;

export default function RecipeDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;
  const recipeImage = recipe?.image.repo_path ?? recipe?.image.source_url;

  const handleBackToArchive = () => {
    navigate('/archive');
  };

  if (!recipe) {
    return (
      <TextContainer>
        <BackButton onClick={handleBackToArchive}>← Back to Archive</BackButton>
        <ErrorContainer>
          <ErrorTitle>Recipe not found</ErrorTitle>
          <p>Try going back to the Archive to browse available recipes.</p>
        </ErrorContainer>
      </TextContainer>
    );
  }

  return (
    <TextContainer>
      <BackButton onClick={handleBackToArchive}>← Back to Archive</BackButton>

      <RecipeTitle>{recipe.title}</RecipeTitle>

      {recipeImage && <RecipeImage src={recipeImage} alt={recipe.image.alt} />}

      {recipe.description && (
        <RecipeDescription>{recipe.description}</RecipeDescription>
      )}

      <RecipeMeta>
        {recipe.author && (
          <MetaItem>
            <span className="label">Author:</span>
            <span className="value">{recipe.author}</span>
          </MetaItem>
        )}
        {recipe.prep_time && (
          <MetaItem>
            <span className="label">Prep:</span>
            <span className="value">{parseTime(recipe.prep_time)} min</span>
          </MetaItem>
        )}
        {recipe.cook_time && (
          <MetaItem>
            <span className="label">Cook:</span>
            <span className="value">{parseTime(recipe.cook_time)} min</span>
          </MetaItem>
        )}
      </RecipeMeta>

      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <>
          <SectionTitle>Ingredients</SectionTitle>
          <IngredientList>
            {recipe.ingredients.map((ingredient, index) => (
              <IngredientItem key={index}>{ingredient}</IngredientItem>
            ))}
          </IngredientList>
        </>
      )}

      {recipe.steps && recipe.steps.length > 0 && (
        <>
          <SectionTitle>Instructions</SectionTitle>
          <StepList>
            {recipe.steps.map((step, i) => (
              <StepItem key={i}>{step}</StepItem>
            ))}
          </StepList>
        </>
      )}
    </TextContainer>
  );
}

import React from 'react';
import { useLocation } from 'react-router-dom';

export default function RecipeDetail() {
  const location = useLocation();
  const { recipe } = location.state || { recipe: {} };
  console.log('RecipeDetail', recipe);
  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <img height={400} src={recipe.image} />
    </div>
  );
}

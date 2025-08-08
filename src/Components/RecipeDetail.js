import React from 'react';
import { useLocation } from 'react-router-dom';

export default function RecipeDetail() {
  const location = useLocation();
  const { recipe } = location.state || { recipe: {} };
  console.log('RecipeDetail', recipe);

  /*TODO
  - Design UX and display recipe details
  - Add a back button to return to the archive
  - Handle cases where recipe is not found or state is undefined

  */
  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <img height={400} src={recipe.image} />
    </div>
  );
}

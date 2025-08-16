import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import recipes from '../store/dummy_recipes.json'
import { Link } from 'react-router-dom'
import { TextContainer } from '../utils/sharedCSS';

/*export default function RecipeDetail() {
  const location = useLocation();
  const { recipe } = location.state || { recipe: {} };
  console.log('RecipeDetail', recipe);

  /*TODO
  - Design UX and display recipe details
  - Add a back button to return to the archive
  - Handle cases where recipe is not found or state is undefined

  */

  /*return (
    <div>
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <img height={400} src={recipe.image} />
    </div>
  );
} */

export default function RecipeDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;

  if (!recipe) {
    return (
      <div>
        <button onClick={() => navigate(-1)}>←Back</button>
        <h2>Recipe not found</h2>
        <p>Try going back to the Archive.</p>
      </div>
    );
  } 

  return (
    <div>
      <button onClick={() => navigate(-1)}>←Back</button>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <p>Author: {recipe.author}</p>
      <p>Prep: {recipe.prep_time} | Cook: {recipe.cook_time}</p>
      <img height={400} src={recipe.image} />
    </div>
  );
}
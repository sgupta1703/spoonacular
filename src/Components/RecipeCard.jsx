import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const dishType = recipe.dishTypes?.length
    ? recipe.dishTypes.join(', ')
    : 'Unknown';

  return (
    <div className="recipe-card">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipe-image"
      />
      <div className="recipe-info">
        <h2>{recipe.title}</h2>
        <p>Dish Type: {dishType}</p>
        <p>Prep Time: {recipe.readyInMinutes} min</p>
      </div>
    </div>
  );
};

export default RecipeCard;

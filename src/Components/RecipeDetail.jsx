import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from './SideBar';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=4c038f219a20408b8a11a8e4b4a10fda`
        );
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDetails();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="page-layout">
      <Sidebar disabled />
      <div className="recipe-detail">
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} />
        <p>
          <strong>Summary:</strong>{' '}
          <span dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        </p>
        <p><strong>Ingredients:</strong></p>
        <ul>
          {recipe.extendedIngredients?.map((i) => (
            <li key={i.id}>{i.original}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetail;

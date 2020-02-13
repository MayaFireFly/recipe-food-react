import React from 'react';

const IMG_DEFAULT = '/img/';
const TITLE_DEFAULT = 'Without title';
const N_A = 'N/A';

const RecipeCard = ({recipe}) => {
  const image = recipe && recipe.image && recipe.image !== '' ? recipe.image : IMG_DEFAULT;
  const title = recipe && recipe.label && recipe.label !== '' ? recipe.label : TITLE_DEFAULT;
  const calories = recipe && recipe.calories && recipe.calories !== '' ? recipe.calories : N_A;
  const ingredients = recipe && recipe.ingredientLines && recipe.ingredientLines !== '' ? recipe.ingredientLines : [...N_A];

  return <div className='recipe-card'>
    <h2>{title}</h2>
    <div className='recipe-card-img'>
      <img src={image} alt={`image - ${title}`}/>
    </div> 
    <div className='recipe-card-text'>
      {ingredients.map((ingredient, index) => (
        <span key={`${index}-ingredient`} className='ingredient-span'>{ingredient}</span>
      ))}
    </div>
    <div className='recipe-card-footer'>
      <span>calories: </span>
      <span>{calories}</span>  
    </div>
  </div>;
};

export default RecipeCard;
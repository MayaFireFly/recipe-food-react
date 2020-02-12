import React from 'react';

const IMG_DEFAULT = '/img/';
const TITLE_DEFAULT = 'Without title';
const LIKES_DEFAULT = '0';

const RecipeCard = ({recipe}) => {
  const image = recipe && recipe.image && recipe.image !== '' ? recipe.image : IMG_DEFAULT;
  const title = recipe && recipe.title && recipe.title !== '' ? recipe.title : TITLE_DEFAULT;
  const likes = recipe && recipe.likes && recipe.likes !== '' ? recipe.likes : LIKES_DEFAULT;

  return <div className='recipe-card'>
    <h2>{title}</h2>
    <div className='recipe-card-img'>
      <img src={image} alt={`image - ${title}`}/>
    </div> 
    <div className='recipe-card-footer'>
      <span>LIKES</span>
      <span>{likes}</span>  
    </div>
  </div>;
};

export default RecipeCard;
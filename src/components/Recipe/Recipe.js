import React from 'react';

const IMG_DEFAULT = '/img/';
const TITLE_DEFAULT = 'Without title';
const INSTRUCTIONS_DEFAULT = 'Without instructions';

const Recipe = ({recipe}) => {
  const image = recipe && recipe.image && recipe.image !== '' ? recipe.image : IMG_DEFAULT;
  const title = recipe && recipe.title && recipe.title !== '' ? recipe.title : TITLE_DEFAULT;
  const instructions = recipe && recipe.instructions && recipe.instructions !== '' ? recipe.instructions : INSTRUCTIONS_DEFAULT;

  return <div className='recipe-full'>
    <h2>{title}</h2>
    <div className='recipe-full-img'>
      <img src={image} alt={`image - ${title}`}/>
    </div> 
    <div className='recipe-full-instructions'>
      <p>{instructions}</p> 
    </div>
  </div>;
};

export default Recipe;
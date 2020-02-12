import React from 'react';
import ReactDOM from 'react-dom';
import RecipeCard from '../components/Recipe/RecipeCard';

describe('RecipeCard', () => {  
  it('render RecipeCard without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RecipeCard/>, div);
  });       
});
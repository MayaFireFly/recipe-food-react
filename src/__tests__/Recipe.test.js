import React from 'react';
import ReactDOM from 'react-dom';
import Recipe from '../components/Recipe/Recipe';

describe('Recipe', () => {  
  it('render Recipe without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Recipe/>, div);
  });       
});
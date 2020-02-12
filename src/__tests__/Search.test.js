import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../components/Search/Search';

describe('Search', () => {
  it('render Search without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search/>, div);
  });       
});
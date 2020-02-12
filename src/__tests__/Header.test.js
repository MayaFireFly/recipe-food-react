import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Header/Header';

describe('Header', () => {
  it('render Header without crushing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header text='TEST'/>, div);
  });       
});
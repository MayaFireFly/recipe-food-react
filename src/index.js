import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

ReactDOM.render(<App/>, document.getElementById('root'));

module.hot.accept();		//development mode only
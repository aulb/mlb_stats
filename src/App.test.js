import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/* Currently no test, TODO: enzyme tests for shallow rendering */

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

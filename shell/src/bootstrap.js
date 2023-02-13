import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

const render = App => {
  const root = document.getElementById('root');

  ReactDOMClient.hydrateRoot(
    root,
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

render(App);
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import configureStore from './store/configure-store';

let devTools;

if (CALIOPEN_ENV === 'development') {
  devTools = window.devToolsExtension && window.devToolsExtension();
}

const store = configureStore({}, devTools);

const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <BrowserRouter>
      <App store={store} />
    </BrowserRouter>
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    ReactDOM.render(
      <AppContainer>
        <BrowserRouter>
          <NextApp store={store} />
        </BrowserRouter>
      </AppContainer>,
      rootEl
    );
  });
}

import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import Root from './root';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
        <Component />
    </AppContainer>,
    document.querySelector('#root')
  );
}

render(Root);

if (module.hot) {
  module.hot.accept('./root', () => { render(Root) });
}

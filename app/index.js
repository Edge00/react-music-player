import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import Hello from './components/hello';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
        <Component />
    </AppContainer>,
    document.querySelector('#root')
  );
}

render(Hello);

if (module.hot) {
  module.hot.accept('./components/hello', () => { render(Hello) });
}

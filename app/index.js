import React from 'react';
import { render } from 'react-dom';
import Hello from './components/hello.js';

render(
    <Hello></Hello>,
    document.querySelector('#root')
);

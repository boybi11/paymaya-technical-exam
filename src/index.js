/*eslint-disable import/default*/

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import Routes from './Routes';

import './assets/scss/all.scss';

render(
	<BrowserRouter>
        <Routes />
    </BrowserRouter>,
	document.getElementById('root') 
);

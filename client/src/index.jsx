import ReactDom from 'react-dom';
import React from 'react';
import App from './App';
import './styles/css/bootstrap.css';

const root = ReactDom.createRoot(document.getElementById('root'));

root.render(
    <App />,
    document.getElementById('react')
)
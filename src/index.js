import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { StyleProvider } from '@ant-design/cssinjs';
import { initAxios } from './Axios';


const root = ReactDOM.createRoot(document.getElementById('root'));
initAxios();
root.render(
    <BrowserRouter>
      <StyleProvider hashPriority="high">
        <App />
      </StyleProvider>
    </BrowserRouter>
);



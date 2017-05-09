import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ChatStore from './ChatStore';

ReactDOM.render(
  <App ChatStore={ChatStore} />,
  document.getElementById('coconnut-chat-widget')
);

// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import "./fonts.css"
import App from './App.jsx';
import store from './store/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import { AuthProvider } from './Auth/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <BrowserRouter> {/* Wrap your app with BrowserRouter */}
      <AuthProvider>

        <App />
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);

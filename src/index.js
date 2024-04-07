import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import {AuthProvider} from './context/authProvider';
import {MethodProvider} from './context/methodProvider';
import {Toaster} from "sonner";
import {Provider} from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Provider store={store}>
            <MethodProvider>
                <AuthProvider>
                    <Toaster
                        richColors
                        position="top-right"
                        closeButton
                        duration="2000"
                        toastOptions={{
                            style: {fontSize: '15px', width: 'fit-content', right: 0}
                        }}
                    />
                    <App/>
                </AuthProvider>
            </MethodProvider>
        </Provider>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';
import {AuthProvider} from './context/authProvider';
import {MethodProvider} from './context/methodProvider';
import {Toaster} from "sonner";
import ScrollToTop from "./services/scrollToTop";
import {Provider} from 'react-redux';
import store from './redux/store';
import {SocketProvider} from "./context/socketProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <ScrollToTop/>
            <Provider store={store}>
                <SocketProvider>
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
                </SocketProvider>
            </Provider>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

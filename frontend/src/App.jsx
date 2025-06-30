import { NavLink } from 'react-router-dom';
import AppRoutes from './routes.jsx';

import { ToastContainer } from 'react-toastify';

import './App.css';
import { UserContext } from './contexts/UserContext.jsx';
import { useLocalStorage } from './hooks/LocalStorage.jsx';
import { useEffect, useState } from 'react';

function App() {
    const { getItem, setItem } = useLocalStorage();
    const [ isAdmin, setIsAdmin ] = useState(false);

    const storeAdmin = (value) => { 
        setItem('isAdmin', value);

    }

    useEffect(() => {
        setIsAdmin(getItem('isAdmin') === 'true');
    });

    return (
        <div id="app">
            <nav className='main-nav'>
                <NavLink end className='nav-link' to="/">About</NavLink> | 
                <NavLink end className='nav-link' to="/rules">Rules</NavLink> | 
                <NavLink end className='nav-link' to="/cards">View Cards</NavLink> | 
                <NavLink end className='nav-link' to="/card">New Card</NavLink>
            </nav>
            <UserContext.Provider value={{ isAdmin, storeAdmin }}>
                <AppRoutes />
            </UserContext.Provider>
            <ToastContainer
                position="bottom-center"
                autoClose={1500}
                closeOnClick={true}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                hideProgressBar={true}
                theme="dark"
            />
        </div>
    );
}

export default App;
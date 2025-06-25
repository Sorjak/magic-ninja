import { NavLink } from 'react-router-dom';
import AppRoutes from './routes.jsx';

import { ToastContainer } from 'react-toastify';

import './App.css';

function App() {
    return (
        <div id="app">
            <nav className='main-nav'>
                <NavLink end className='nav-link' to="/">About</NavLink> | 
                <NavLink end className='nav-link' to="/rules">Rules</NavLink> | 
                <NavLink end className='nav-link' to="/cards">View Cards</NavLink> | 
                <NavLink end className='nav-link' to="/card">New Card</NavLink>
               {/* <NavLink to="/card/:id">Edit Card</NavLink> */}
            </nav>
            <AppRoutes />
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
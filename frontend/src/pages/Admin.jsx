import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

import './Page.css';

function Admin() {
  const { isAdmin, storeAdmin } = useContext(UserContext);

  const login = () => {
    storeAdmin('true');
  }

  const logout = () => {
    storeAdmin('false');
  }

  return (
    <div id="admin-page" className="page">
        <p>You are currently {isAdmin ? 'logged in as Admin.' : 'not logged in.'}</p>

        {!isAdmin && <button onClick={login}>Login as Admin</button>}
        {isAdmin && <button onClick={logout}>Logout</button>}
    </div>
  )
}

export default Admin
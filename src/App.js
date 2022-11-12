import { database } from './firebaseConfig';

import { Chat } from './components/chat/Chat';
import { LoginRegister } from './components/login-register/LoginRegister';
import { AuthContext } from './contexts/AuthContext';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useContext } from 'react';

function App() {
  const { loggedUser } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginRegister />} />
          <Route path='/chat' element={loggedUser ? <Chat /> : <LoginRegister />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

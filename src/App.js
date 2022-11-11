import { AuthContext } from './contexts/AuthContext';
import { database } from './firebaseConfig';
import { auth } from './firebaseConfig';
import { Chat } from './components/chat/Chat';
import { LoginRegister } from './components/login-register/LoginRegister';
import {  Routes, Route } from 'react-router-dom';

function App() {

  return (
    <AuthContext.Provider value={{ auth }}>
      <div className="App">
        <Routes>
        <Route path='/' element={<LoginRegister />} />
        <Route path='/chat' element={<Chat />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;

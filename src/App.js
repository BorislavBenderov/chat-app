import { collection, onSnapshot } from 'firebase/firestore';
import { AuthContext } from './contexts/AuthContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import { database } from './firebaseConfig';
import { auth } from './firebaseConfig';
import { Chat } from './components/chat/Chat';
import { LoginRegister } from './components/login-register/LoginRegister';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedUser(user);
      }
    })
  }, []);

  const login = (auth, email, password) => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password);
      })
      .catch((err) => {
        alert(err.message);
      });
    navigate('/');
  }

  const register = (auth, email, password) => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        createUserWithEmailAndPassword(auth, email, password);
      })
      .catch((err) => {
        alert(err.message);
      });
    navigate('/');
  }

  return (
    <AuthContext.Provider value={{ auth, register, login }}>
      <div className="App">
        <LoginRegister />
      </div>
    </AuthContext.Provider>
  );
}

export default App;

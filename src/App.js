import { collection, onSnapshot } from 'firebase/firestore';
import { database } from './firebaseConfig';

import { Chat } from './components/chat/Chat';
import { LoginRegister } from './components/login-register/LoginRegister';

function App() {
  return (
    <div className="App">
      <LoginRegister />
    </div>
  );
}

export default App;

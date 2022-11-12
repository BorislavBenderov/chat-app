import { signOut } from "firebase/auth";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, onSnapshot, orderBy, query, QuerySnapshot, serverTimestamp } from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { Message } from "./Message";

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    const [input, setInput] = useState('');
    const { auth } = useContext(AuthContext);
    const scroll = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const q = query(collection(database, 'messages'), orderBy('timestamp'));
        onSnapshot(q, (querySnapshot) => {
            setMessages(querySnapshot.docs.map(item => {
                return { ...item.data(), id: item.id }
            }));
        });
        onSnapshot(collection(database, 'users'), (data) => {
            setUsers(data.docs.map(item => {
                return { ...item.data() }
            }))
        })
    }, []);

    

    const onCreate = async (e) => {
        e.preventDefault();

        const uid = auth.currentUser.uid;

        if (input === '') {
            alert('Please enter a valid message');
            return;
        }

        await addDoc(collection(database, 'messages'), {
            text: input,
            uid,
            timestamp: serverTimestamp()
        });

        setInput('');
        scroll.current.scrollIntoView({ behavior: 'smooth' });
    }

    const onLogout = () => {
        signOut(auth).then(() => {
            navigate('/');
        }).catch((err) => {
            alert(err.message);
        });     
    }

    return (
        <>
            <div className="btn__container">
                <button className="btn__logout" onClick={onLogout}>Logout</button>
            </div>
            <div className="--dark-theme" id="chat">
                <div className="chat__conversation-board">
                    {messages.map(message => <Message key={message.id} message={message} scroll={scroll} users={users} />)}
                </div>
                <div className="chat__conversation-panel">
                    <div>
                        <form onSubmit={onCreate} className='chat__conversation-panel__container'>
                            <input
                                className="chat__conversation-panel__input panel-item"
                                placeholder="Type a message..."
                                name="text"
                                id="text"
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                            />
                            <button className="chat__conversation-panel__button panel-item btn-icon send-message-button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                    data-reactid={1036}
                                >
                                    <line x1={22} y1={2} x2={11} y2={13} />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
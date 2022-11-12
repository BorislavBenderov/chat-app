import { createContext, useEffect, useState } from "react";
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedUser(user);
            }
        })
        return () => {
            unsub();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ loggedUser, auth }}>
            {children}
        </AuthContext.Provider>
    );
}
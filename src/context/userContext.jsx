import { createContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener  } from "../utils/firebase/firebase-utils";


// as the actual value that want to access 
export const UserContext = createContext({
    currentUser : null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    // storing ths user 
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser ,setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
        if(user) {
            createUserDocumentFromAuth(user)
        } 
        setCurrentUser(user)
        console.log(user)
        })
        // return unsubscribe
    },[])

    return <UserContext.Provider value={ value }>{ children  }</UserContext.Provider>
}
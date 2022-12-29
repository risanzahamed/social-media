import { createContext, useState } from "react";
import React from 'react';
import {createUserWithEmailAndPassword, getAuth,signOut, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile} from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { useEffect } from 'react';

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState('');
    const [loader, setLoader] = useState(true);

    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const Userlogin = (email, password) =>{
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const UserlogOut = ()=>{
        return signOut(auth)
    }

    const googleLogin = ()=>{
        return signInWithPopup(auth, provider)
    }


    const updateName = (name)=>{
        return updateProfile(auth.currentUser, {displayName: name})
    }

    const updatePhoto = (url)=>{
        return updateProfile(auth.currentUser, {photoURL: url})
    }

    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoader(false);
        });

        return () =>{
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user, 
        loader,
        createUser, 
        Userlogin,
        UserlogOut,
        googleLogin,
        updateName,
        updatePhoto
        
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
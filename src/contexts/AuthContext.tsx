import { createContext, useEffect, useState } from "react";
//import { signInRequest, checkAuthRequest } from "../services/auth";
import { getUser } from "../services/users";
import { setCookie, parseCookies, destroyCookie } from 'nookies' ;
import Router from 'next/router';
import { IUser } from "../types";
import { queryGetUser } from "../services/queries/queries";

type SignInData = {
    email: string;
    password: string;
    //recaptcha_token: string;
}

type AuthContextType = {    
    isAuthenticated: boolean;
    user: IUser | null;
    signIn: (data: SignInData) => Promise<void>;
    checkAuth: (data: SignInData) => Promise<void>;
    signOut: () => Promise<void>;
}


export const AuthContext = createContext({} as AuthContextType);



export function AuthProvider({ children }: { children:any }) {
    const [user, setUser] = useState<IUser | null>(null);

    const isAuthenticated = !!user;

    const { 'token': token } = parseCookies();
    //const token = '1057ae53-06c9-4bd4-b6d0-f30c5bd18f39';
    

    useEffect( () => {

        if (token) {
            // Temporary solution before implementing login
            getUser({id: token}).then( user => {
                if (user?.id) {
                    setUser(user);
                    //console.log(user);
                }
            });
        }
    }, [] );    


    async function signIn({ email, password }: SignInData) {
        /* const result = await signInRequest({
            email, password
        });

        //console.log(result);

        let authorized = result?.authorized;
        let data = result?.data;

        let token = null;
        let profile = null;

        if (authorized){
            token = data.token;
            profile = data.profile;            
            profile['plan_summary'] = data.plan_summary;

            setCookie(undefined, 'token', token, {
                maxAge: 60 * 60 * 24, // 1 Hour
            });

            setUser(profile);

            Router.push('/account');
        }
        else{        
            //console.log('Invalid Credentials!!!')            
        }        
        
        return result; */
    }

    async function checkAuth() {
        /* const result = await checkAuthRequest();
        
        return result; */
    }

    async function signOut() {
        destroyCookie(null, 'token');        
        Router.reload();
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, checkAuth, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
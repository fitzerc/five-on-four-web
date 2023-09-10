import { createStore } from 'solid-js/store'
import { createContext, useContext } from "solid-js";
import { FiveOnFourUser } from '../Models/user';

export const UserContext = createContext();


export function UserContextProvider(props: any) {
    const [user, setUser] = createStore<FiveOnFourUser>();
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}

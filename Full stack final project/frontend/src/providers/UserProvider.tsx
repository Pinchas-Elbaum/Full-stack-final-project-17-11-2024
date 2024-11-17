import { createContext, ReactNode, useState } from 'react'
import { IUser } from '../types/Types';


interface Props {
    children: ReactNode;
}

interface ContextProps {
    user: IUser;
    setuser: (user: IUser) => void;
}

export const UserContext = createContext<ContextProps>({} as ContextProps);


const UserProvider = ({ children }: Props) => {
    const [user, setuser] = useState<IUser>({} as IUser);
    
    return (

        <div>
            <UserContext.Provider value={{ user, setuser }}>
                {children}
            </UserContext.Provider>
        </div>
    )
}

export default UserProvider
import { createContext, ReactNode, useState } from 'react'
import { IResorces } from '../types/Types';


interface Props {
    children: ReactNode;
}

interface ContextProps {
   resources: IResorces[];
   setresources: (resources: IResorces[]) => void
}

export const ResorcesContext = createContext<ContextProps>({} as ContextProps);


const ResourcesProvider = ({ children }: Props) => {
    const [resources, setresources] = useState<IResorces[]>([] as IResorces[]);    
    return (

        <div>
            <ResorcesContext.Provider value={{ resources, setresources }}>
                {children}
            </ResorcesContext.Provider>
        </div>
    )
}

export default ResourcesProvider
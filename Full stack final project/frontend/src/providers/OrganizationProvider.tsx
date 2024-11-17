import { createContext, ReactNode, useState } from 'react'
import { IOrganization } from '../types/Types';



interface Props {
    children: ReactNode;
}

interface ContextProps {
    organization: IOrganization;
    setorganization: (organization: IOrganization) => void
}

export const OrganizationContext = createContext<ContextProps>({} as ContextProps);


const OrganizationProvider = ({ children }: Props) => {
    const [organization, setorganization] = useState<IOrganization>({resources: []} );
    
    return (

        <div>
            <OrganizationContext.Provider value={{ organization, setorganization }}>
                {children}
            </OrganizationContext.Provider>
        </div>
    )
}

export default OrganizationProvider
import axios from 'axios'
import  {  useContext, useEffect, useState } from 'react'
import { IMissiles } from '../types/Types'
import { useNavigate } from 'react-router-dom';
import { deleteToken } from '../service/DeleteToken';
import { UserContext } from '../providers/UserProvider';
import { ResorcesContext } from '../providers/ResorcesProvidser';



const Shop = () => {
    const navigate = useNavigate();
    const {user, setuser} = useContext(UserContext);
    const { setresources} = useContext(ResorcesContext)!;

    const [weponsList, setweponsList] = useState<IMissiles[]>([]);


    useEffect(() => {
        axios.get('http://localhost:3300/api/missiles').then(res => setweponsList(res.data));
    },[])


    const logOut = () => {
        deleteToken();
        navigate('/');
    }

    const buy = async (missile: IMissiles) => {
        try {
            await axios.put(`http://localhost:3300/api/buyMissile/${user._id}`, {name: missile.name, amount: 1}, {withCredentials: true});
            
            const userResponse = await axios.get(`http://localhost:3300/api/user/${user._id}`);
            setuser(userResponse.data);
            
            const resourcesResponse = await axios.get(`http://localhost:3300/api/organizationMissiles/${user.organizationId}`);
            setresources(resourcesResponse.data);
            
        } catch (error) {
            console.error("Error during buying missile:", error);
        }
    }
    
        

  return (
    <div>
        <h3>Budget: {user.budget} </h3>
        <table>
            <thead>
                <tr>
                    <th>Rocket</th>
                    <th>Intercepts</th>
                    <th>Price</th>
                    <th>Buy</th>
                </tr>
            </thead>
            <tbody>
                {weponsList.map((missile) => (<tr key={missile.name}><td>{missile.name}</td><td>{missile.intercepts}</td><td>{missile.price}</td><td><button onClick={() => {buy(missile)}}>+</button></td></tr>))}                
            </tbody>
        </table> 
        <button onClick={() => {navigate('/')}}>Home</button>  
        <button onClick={logOut}>Log out</button>
    </div>
  )
}

export default Shop
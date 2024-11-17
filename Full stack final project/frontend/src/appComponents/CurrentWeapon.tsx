import  { useContext } from 'react'
import { UserContext } from '../providers/UserProvider'
import { ResorcesContext } from '../providers/ResorcesProvidser'
import { useNavigate } from 'react-router-dom'
import { deleteToken } from '../service/DeleteToken'

const CurrentWeapon = () => {
    const{user} = useContext(UserContext)
    const{resources} = useContext(ResorcesContext) 

    const navigate = useNavigate();
    const logOut = () => {
      deleteToken();
      navigate('/');
  }

  return (
    <div>
        <h1>organizations: {user.organization}</h1>
        <h2>Budget: {user.budget}</h2>
        {resources.map(wepon =>  <p key={wepon.name}>{wepon.name} X {wepon.amount}</p>)}
        <button onClick={() => { navigate('/shop') }}>Go to Shop</button>
        <button onClick={() => {logOut()}}>Log out</button>

    </div>
  )
}

export default CurrentWeapon
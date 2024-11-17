import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
        <button onClick={() => { navigate('/login') }}>LOGIN</button>
        <button onClick={() => { navigate('/register') }}>REGISTER</button>
      
    </div>
  )
}

export default Home

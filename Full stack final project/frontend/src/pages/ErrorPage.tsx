import { useNavigate } from "react-router-dom"

const ErrorPage = ( ) => {
    const navigate = useNavigate()
        return (
        <div>
            <h1>Error 404</h1>
            <h2>Page not found</h2>
            <button onClick={() => { navigate('/') }}>Home</button>
        </div>
    )
}

export default ErrorPage

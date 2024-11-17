import { Route, Routes } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import Home from "../appComponents/Home"
import Register from "../appComponents/Register"
import Login from "../appComponents/Login"
import CurrentWeapon from "../appComponents/CurrentWeapon"
import Shop from "../appComponents/Shop"
import ProtecRoutes from "../ProtectionRoutes/ProtecRoutes"


export const AppRoutes = () => {
    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/current" element={<ProtecRoutes> <CurrentWeapon /> </ProtecRoutes>}></Route>
            <Route path="/shop" element={<ProtecRoutes> <Shop /> </ProtecRoutes>} ></Route>
            <Route path="*" element={<ErrorPage  />} />
        </Routes>
    )
}
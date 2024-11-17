import { Route, Routes } from "react-router-dom"
import ErrorPage from "../pages/ErrorPage"
import Home from "../appComponents/Home"
import Register from "../appComponents/Register"
import Login from "../appComponents/Login"
import CurrentWeapon from "../appComponents/CurrentWeapon"
import Shop from "../appComponents/Shop"


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/current" element={<CurrentWeapon />}></Route>
            <Route path="/shop" element={<Shop />}></Route>
            <Route path="*" element={<ErrorPage  />} />
        </Routes>
    )
}
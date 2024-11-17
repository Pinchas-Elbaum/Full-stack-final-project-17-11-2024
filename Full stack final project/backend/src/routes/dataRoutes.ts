import { Router } from "express";
import { getAllMissiles, getOrganizationMissiles, buyMissile, getUser } from "../controllers/dataController";
import {authenticate} from "../controllers/authController";


const dataRoutes = Router();


dataRoutes.get("/user/:id", getUser)
dataRoutes.get("/missiles", getAllMissiles);
dataRoutes.get("/organizationMissiles/:id",  getOrganizationMissiles);
dataRoutes.put("/buyMissile/:id",authenticate, buyMissile);




export default dataRoutes;
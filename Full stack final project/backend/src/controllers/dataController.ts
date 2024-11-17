import Missille from "../models/missillesModel";
import Organization from "../models/organizationModel";
import User from "../models/userModel";
import { Request, Response } from "express";

export const getAllMissiles = async (req: Request, res: Response): Promise<void> => {
    try {

        const missiles = await Missille.find();
        if (!missiles) {
            res.status(404).json({ error: "Missiles not found" });
            return
        }
        res.status(200).json(missiles);
        return
        
        
      

    } catch (error) {

        res.status(500).json({ error: "Failed to fetch missiles" });
        return
    }
};

export const getOrganizationMissiles = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "Missing params" });
            return
        }
        const organization = await Organization.findById({ _id: id });

        if (!organization) {
            res.status(404).json({ error: "Organization not found" });
            return
        }
        const missiles = organization.resources;
        if (!missiles) {
            res.status(404).json({ error: "Missiles not found" });
            return
        }

        res.status(200).json(missiles);
        return
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch missiles" });
        return
    }
};

export const buyMissile = async (req: Request, res: Response): Promise<void> => {

    try {
        const { id } = req.params;
        const { name, amount } = req.body; 

        if (!id || !name || !amount) { 
            res.status(400).json({ error: "Missing required fields" });
            return
        }
        const user = await User.findById({ _id: id });  
        
        if (!user) {
            res.status(404).json({ error: "User not found" }); // אם לא קיים החזר שגיאה
            return
        }

        const missile = await Missille.findOne({ name });

        if (!missile) {
            res.status(404).json({ error: "Missile not found" });// אם לא קיים החזר שגיאה
            return
        }

        if (user.budget < missile.price * amount) {
            res.status(400).json({ error: "Not enough budget" });
            return
        }

        const organization = await Organization.findOne({_id: user.organizationId }); 

        if (!organization) {
            res.status(404).json({ error: "Organization not found" }); 
            return
        }

        const resources = organization.resources;

        if (!resources) {
            res.status(404).json({ error: "Resources not found" });
            return
        }

        const isMissileExistsAtOraganization = resources.find(resource => resource.name === name) 

        if (isMissileExistsAtOraganization) {
            resources.map(resource => resource.name === name ? resource.amount += Number(amount) : resource);
        }
        else {
            resources.push({ name, amount });// אחרת הוסף את הנשק למערך
        }

        organization.resources = resources; // עדכון את המערך של הארגון למערך החדש הכולל את הנשק החדש
        await organization.save(); //שמור את הנתונים החדשים

        user.budget -= missile.price * amount; // עדכון את הארנק של המשתמש
        await user.save(); //שמור את הנתונים החדשים של המשתמש

        res.status(200).json(user);
        return
    } catch (error) {
        res.status(500).json({ error: "Failed to buy missile" });
        return
    }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "Missing params" });
            return
        }
        const user = await User.findById({ _id: id });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return
        }
        res.status(200).json(user);
        return
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
        return
    }
}
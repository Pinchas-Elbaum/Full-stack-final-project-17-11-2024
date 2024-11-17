import Missille from "../models/missillesModel";
import Organization from "../models/organizationModel";
import User from "../models/userModel";
import { Request, Response } from "express";

export const getAllMissiles = async (req: Request, res: Response): Promise<void> => {
    try {
        const missiles = await Missille.find();
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
        const organization = await Organization.findById({ _id: id });
        if (!organization) {
            res.status(404).json({ error: "Organization not found" });
            return
        }
        const missiles = organization.resources;

        res.status(200).json(missiles);
        return
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch missiles" });
        return
    }
};

export const buyMissile = async (req: Request, res: Response): Promise<void> => {

    try {
        const { id } = req.params;// מקבל איידי של יוזר
        const { name, amount } = req.body; // מקבל שם וכמות של נשק

        if (!id || !name || !amount) { // אם אין אחד מהפרמטרים  - החזר שגיאה
            res.status(400).json({ error: "Missing required fields" });
            return
        }
        const user = await User.findById({ _id: id }); // בדוק האם קיים משתמש בשם זה  
        
        if (!user) {
            res.status(404).json({ error: "User not found" }); // אם לא קיים החזר שגיאה
            return
        }

        const missile = await Missille.findOne({ name }); // חפש נשק לפי השם שנשלח בגוף הבקשה

        if (!missile) {
            res.status(404).json({ error: "Missile not found" });// אם לא קיים החזר שגיאה
            return
        }

        if (user.budget < missile.price * amount) {
            res.status(400).json({ error: "Not enough budget" });
            return
        }

        const organization = await Organization.findOne({ name: user.organization }); // מצא את הארגון של המשתמש לפי ההשתייכות שלו

        if (!organization) {
            res.status(404).json({ error: "Organization not found" }); // אם לא קיים כזה ארגון החזר שגיאה
            return
        }

        const resources = organization.resources; // חלץ את המערך של הנשקים של הארגון

        const isMissileExistsAtOraganization = resources.find(resource => resource.name === name) // בדוק האם הנשק כבר קיים בארגון

        if (isMissileExistsAtOraganization) {
            resources.map(resource => resource.name === name ? resource.amount += Number(amount) : resource);// אם קיים הוסף לכמות הנשקים של הארגון
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
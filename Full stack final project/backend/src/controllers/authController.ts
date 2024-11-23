import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import Organization from "../models/organizationModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface DTO {
    message: string;
    data?: any;
    success: boolean;
  }

export const register = async (req: Request, res: Response): Promise<void> => {
    try {

        const { name, password, organization, area } = req.body;

        if (!name || !organization || !password) {
            res.status(400).json({message: "Missing required fields", success: false});
            return;
        }

        const existingUser = await User.findOne({ name }); 

        if (existingUser) {
            res.status(400).json({ message: "User name already exists" , data: { name }, success: false});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userOrganization = await Organization.findOne({ name: organization });

        if (!userOrganization) {
            res.status(400).json({ message: "Organization not found" , data: { organization }, success: false});
            return;
        }
        const organizationId = userOrganization._id;

        const budget = userOrganization.budget;
        const user = await User.create({
            name,
            password: hashedPassword,
            organization,
            area,
            budget,
            organizationId
          });

        const response: DTO = {
            message: "User created successfully",
            success: true,
            data: {
                name,
                },
          };
        
        res.status(201).json(response);
        return

    } catch (error) { 
        res.status(500).json({ message: "Failed to save user", success: false });
        return
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {

        const { name, password } = req.body;

        if (!name || !password) {
            res.status(400).json({ message: "Missing required fields" , success: false});
            return;
        }

        const user = await User.findOne({ name });

        if (!user) {
            res.status(401).json({ message: "Invalid name" , success: false});
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid name or password" , success: false, data: {name, password  } });
            return
        }

        const token = jwt.sign({ id: user._id, organization: user.organization }, process.env.JWT_SECRET || "", { expiresIn: "5h" });


        res.cookie("auth_token", token, {
            maxAge: 1000 * 60 * 60 * 5,
            httpOnly: true
        });

        res.status(200).json( { message: "Login successful", success: true, data:{ id: user._id, name: user.name }});
        return

    } catch (error) {

        console.error("Error logging in:", error);
        res.status(500).json({ message: "Failed to login", success: false });
    }
};

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {

        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: "Missing params", success: false });
            return
        }

        const user = User.findById(id);

        if (!user) {
            res.status(404).json({ message: "User not found", success: false });
            return
        }
        
        const token = req.cookies.auth_token;
        if (!token) {
            res.status(401).json({ message: "No token provided", success: false });
            return
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as { id: string, organization: string };

        if (!decoded) {
            res.status(401).json({ message: "Invalid token", success: false });
            return
        }
        if (!decoded.id || !decoded.organization) {
            res.status(401).json({ message: "Invalid token", success: false });
            return
        }

        if (decoded.id !== id) {
            res.status(401).json({ message: "Invalid token", success: false });
            return
        }

        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid token", success: false });
        return
    }
};

export const logout = (req: Request, res: Response): void => {
    try {
        res.clearCookie("auth_token");
        res.status(200).json({ message: "Logout successful", success: true });
        return
    } catch (error) {
        res.status(500).json({ message: "Failed to logout" , success: false});
        return
    }
  
};
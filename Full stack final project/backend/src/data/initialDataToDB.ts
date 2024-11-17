import fs from "fs";
import Missile from "../models/missillesModel";
import Organization from "../models/organizationModel";

export const initialDataToDB = async (): Promise<void> => {
    try {
        const [missileCount, organizationCount] = await Promise.all([
            Missile.countDocuments(),
            Organization.countDocuments()
        ]);

        if (missileCount === 0 && organizationCount === 0) {
            const missileData: string = fs.readFileSync("src/data/missiles.json", 'utf-8');
            const missiles = JSON.parse(missileData);

            const organizationData: string = fs.readFileSync("src/data/organizations.json", 'utf-8');
            const organizations = JSON.parse(organizationData);

            await Promise.all([
                Missile.insertMany(missiles),
                Organization.insertMany(organizations)
            ]);

            console.log("Data inserted successfully");
        } else {
            console.log("Data already exists in the database. No insertion needed.");
        }

    } catch (error) {
        console.error("Error inserting data:", error);
    }
};

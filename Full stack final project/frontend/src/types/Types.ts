export interface IUser {
    _id?: string;
    name: string;
    password: string;
    organization: string;
    area: string;
    budget?: number;
    organizationId?: string;
}

export interface IResorces {
    name: string;
    amount: number
}

export interface IMissiles {
    id: string;
    name: string;
    speed: number;
    intercepts: string[];
    price: number;
}

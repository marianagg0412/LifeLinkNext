import { User } from "./user";

export interface Order {
    id: string;
    user: User;
    totalAmount: number;
    status: 'PENDING' | 'COMPLETED' | 'CANCELED';
    productIds: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
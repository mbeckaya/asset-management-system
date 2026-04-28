import type { Timestamps } from "./timestamps.type";

export interface Device extends Timestamps {
    id: number;
    brandId: number;
    deviceTypeId: number;
    resellerId: number;
    deviceStatusId: number;
    purchasedAt: string;
    modelName: string;
    serialNumber: string;
    price: number;

    warrantyMonths?: number;
    lifespanMonths?: number;
}
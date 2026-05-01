import { Knex } from "knex";
import type { Device } from "@shared/types/device.type";

export default class DeviceService {
    constructor(protected db: Knex) {}

    private baseSelect = {
        id: "id",
        brandId: "brand_id",
        deviceTypeId: "device_type_id",
        resellerId: "reseller_id",
        deviceStatusId: "device_status_id",
        purchasedAt: "purchased_at",
        modelName: "model_name",
        serialNumber: "serial_number",
        warrantyMonths: "warranty_months",
        lifespanMonths: "lifespan_months",
        price: "price",
    }

    async findAll(page: number, limit: number) {
        const offset = (page - 1) * limit;

        const devices: Device[] = await this
            .db("devices")
            .select(this.baseSelect)
            .limit(limit)
            .offset(offset);

        const [{ total }] = await this.db("devices").count("* as total");

        return {
            total: Number(total),
            data: devices,
        };
    }

    async findById(id: number) {
        const device: Device = await this
            .db("devices")
            .select(this.baseSelect)
            .where("id", id)
            .first();

        return device;
    }
}





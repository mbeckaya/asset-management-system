import { Request, Response } from "express";
import status from "http-status";
import DeviceService from "../services/device.service";

export default class DeviceController {
    constructor(private service: DeviceService) {}

    getDevices = async (request: Request, response: Response) => {
        const page = typeof request.query.page === "string" ? Number(request.query.page) : 1;
        const limit = typeof request.query.limit === "string" ? Number(request.query.limit) : 10;

        const { data, total } = await this.service.findAll(page, limit);

        const totalPages = Math.ceil(total / limit);

        if (page < 1 || (page > totalPages && totalPages !== 0)) {
            return response
                .status(status.BAD_REQUEST)
                .send({
                    error: `Page must be between 1 and ${totalPages || 1}`
                });
        }

        response
            .status(status.OK)
            .send({
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page !== 1,
                data,
            });
    }

    getDeviceById = async (request: Request, response: Response) => {
        const id = Number(request.params.id);

        const device = await this.service.findById(id);

        if (!device) {
            return response
                .status(status.NOT_FOUND)
                .send({ message: "Device not found" });
        }

        response.status(status.OK).send(device);
    }
}
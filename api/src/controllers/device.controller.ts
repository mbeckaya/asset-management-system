import { Request, Response } from "express";
import status from "http-status";
import DeviceService from "../services/device.service";

export default class DeviceController {
    constructor(private service: DeviceService) {}

    getAll = async (request: Request, response: Response) => {
        const page = typeof request.query.page === "string" ? Number(request.query.page) : 1;
        const limit = typeof request.query.limit === "string" ? Number(request.query.limit) : 10;

        const { data, total } = await this.service.all(page, limit);

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
}
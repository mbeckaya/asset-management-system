import { Router } from "express";
import { db } from "../database/connection";
import DeviceService from "../services/device.service";
import DeviceController from "../controllers/device.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateId } from "../middlewares/validate-id.middleware";
import { API_BASE } from "../utils/constants";

const router = Router();

const deviceService = new DeviceService(db);
const deviceController = new  DeviceController(deviceService);

router.get(
    `${API_BASE}/devices`, 
    authMiddleware, 
    deviceController.getDevices
);

router.get(
    `${API_BASE}/devices/:id`, 
    authMiddleware,
    validateId, 
    deviceController.getDeviceById
);

export default router;
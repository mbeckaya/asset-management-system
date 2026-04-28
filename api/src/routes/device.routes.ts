import { Router } from "express";
import { db } from "../database/connection";
import DeviceService from "../services/device.service";
import DeviceController from "../controllers/device.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { API_BASE } from "../utils/constants";

const router = Router();

const deviceService = new DeviceService(db);
const deviceController = new  DeviceController(deviceService);

router.get(`${API_BASE}/devices`, authMiddleware, deviceController.getAll);

export default router;
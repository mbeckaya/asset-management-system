import { Router } from "express";
import deviceRoutes from "./device.routes"
import userRoutes from "./user.routes";

const routes: Router[] = [
    deviceRoutes,
    userRoutes,
];

export default routes;
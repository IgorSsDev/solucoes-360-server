import { Router } from "express";
import { UpdateValues } from "../controllers/app-totem/update-values";
import { CreateChart } from "../controllers/app-totem/create-chart";
import { GetValues } from "../controllers/app-totem/getInformation";
import { Dashboard } from "../controllers/dashboard/Dashboard";
import { UpdateSatisfied } from "../controllers/app-totem/updateSatisfied";
import SharedEmail from "../controllers/shared-email/sharedEmail";
import GetClients from "../controllers/getDashboard-Admin";
import UpdateDashborad from "../controllers/updateDashboard-Admin";

export const router = Router();

router.get("/", (req, res) => {
    res.status(200).send("welcome Api")
}) 

router.post("/create", CreateChart)
router.post("/get", GetValues)

router.post("/update", UpdateValues)
router.get("/dashboard/:id", Dashboard)
router.get("/dashboard_admin", GetClients)
router.put("/update_admin", UpdateDashborad)

router.post("/satisfied", UpdateSatisfied);
router.post("/share", SharedEmail)

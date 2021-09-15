import dishesRouter from "./dishes.routes";
import categoriesRouter from "./categories.routes";
import infoRouter from "./info.routes";
import { Router } from "express";

const router: Router = Router();

router.use("/dishes/", dishesRouter);
router.use("/categories/", categoriesRouter);
router.use("/info/", infoRouter);

export default router;

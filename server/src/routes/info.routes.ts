import promiseRouter from "express-promise-router";
import controller from "../controllers/info.controller";

const router = promiseRouter();

const { performInfoValidation, getAllInfo, updateInfoDBCall } = controller;

router.get("/", getAllInfo);
router.put("/", performInfoValidation, updateInfoDBCall);

export default router;

import promiseRouter from "express-promise-router";
import controller from "../controllers/info.controller";

const router = promiseRouter();

const {
  performInfoValidation,
  getAllInfo,
  getTitle,
  getRestInfo,
  updateInfoDBCall,
} = controller;

router.get("/title", getTitle);
router.get("/rest", getRestInfo);
router.get("/", getAllInfo);
router.put("/", performInfoValidation, updateInfoDBCall);

export default router;

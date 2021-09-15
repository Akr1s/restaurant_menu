import promiseRouter from "express-promise-router";
import controler from "../controlers/info.controler";

const router = promiseRouter();

const {
  performInfoValidation,
  getAllInfo,
  getTitle,
  getRestInfo,
  updateInfoDBCall,
} = controler;

router.get("/title", getTitle);
router.get("/rest", getRestInfo);
router.get("/", getAllInfo);
router.put("/", performInfoValidation, updateInfoDBCall);

export default router;

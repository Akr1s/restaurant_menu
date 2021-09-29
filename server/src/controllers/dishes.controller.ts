import { getDataFromDatabase, handleDatabaseQuery } from "../helpers/common";
import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../constants/statusCodes";
import { validateDish } from "../validators/dishesValidator";
import { RESPONSE_CODES } from "../constants/responseCodes";
import convertDate from "../utils/convertDate";
import duplicateCheck from "../validators/duplicateCheck";
import cloudinary from "../config/cloudinary.config";

const {
  DISHES_GET_ERROR,
  ADD_ERROR,
  ADD_SUCCESS,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  DELETE_ERROR,
  DELETE_SUCCESS,
} = RESPONSE_CODES;

const getAllDishes = (req: Request, res: Response) => {
  const options = {
    query: "SELECT * FROM DISHES ORDER BY CREATED_DATE ASC",
    errorCode: DISHES_GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getAllDishesFromCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `SELECT * FROM DISHES WHERE CATEGORY IN (SELECT ID FROM CATEGORIES WHERE PARENT='${id}') AND SHOW=TRUE ORDER BY CREATED_DATE ASC`,
    errorCode: DISHES_GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const performDishValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult: number = validateDish(req.body);
  if (validationResult) {
    return res
      .status(STATUS_CODES.VALIDATION_ERROR)
      .send(`${validationResult}`);
  }
  next();
};

const checkDuplicateDish = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, id } = req.body;
  const duplicateCheckResult = await duplicateCheck(
    name,
    `SELECT NAME FROM DISHES WHERE ID<>'${id}'`
  );
  if (duplicateCheckResult !== RESPONSE_CODES.ADD_SUCCESS) {
    return res
      .status(STATUS_CODES.VALIDATION_ERROR)
      .send(`${duplicateCheckResult}`);
  }
  next();
};

const createDishDBCall = (req: Request, res: Response) => {
  const { name, description, img, show, category, weights, id } = req.body;
  const options = {
    query: `INSERT INTO DISHES(ID, NAME, DESCRIPTION, IMG, SHOW, CATEGORY, WEIGHTS, CREATED_DATE, UPDATED_DATE) VALUES ('${id}','${name}', '${description}', '${img}', ${show}, '${category}', '${JSON.stringify(
      weights
    )}', '${convertDate(new Date())}','${convertDate(new Date())}')`,
    successCode: ADD_SUCCESS,
    errorCode: ADD_ERROR,
    successStatusCode: STATUS_CODES.CREATED,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

const updateDishDBCall = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, img, show, category, weights } = req.body;
  const options = {
    query: `UPDATE DISHES SET NAME='${name}' ,DESCRIPTION='${description}', IMG='${img}', SHOW=${show}, CATEGORY='${category}', WEIGHTS='${JSON.stringify(
      weights
    )}', UPDATED_DATE='${convertDate(new Date())}' WHERE ID='${id}'`,
    successCode: UPDATE_SUCCESS,
    errorCode: UPDATE_ERROR,
    successStatusCode: STATUS_CODES.OK,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

const deleteDish = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `DELETE FROM DISHES WHERE ID='${id}'`,
    successCode: DELETE_SUCCESS,
    errorCode: DELETE_ERROR,
    successStatusCode: STATUS_CODES.OK,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
  const { img } = req.body;
  if (!img.startsWith("http")) {
    const response = await cloudinary.uploader.upload(img);
    req.body.img = response.secure_url;
  }
  next();
};

export default {
  getAllDishes,
  getAllDishesFromCategory,
  performDishValidation,
  checkDuplicateDish,
  createDishDBCall,
  updateDishDBCall,
  deleteDish,
  uploadImage,
};

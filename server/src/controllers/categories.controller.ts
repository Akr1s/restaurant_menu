import { getDataFromDatabase, handleDatabaseQuery } from "../helpers/common";
import { NextFunction, Request, Response } from "express";
import { STATUS_CODES } from "../constants/statusCodes";
import { v4 as uuidv4 } from "uuid";
import { validateCategory } from "../validators/categoriesValidator";
import { RESPONSE_CODES } from "../constants/responseCodes";
import convertDate from "../utils/convertDate";
import duplicateCheck from "../validators/duplicateCheck";

const {
  CATEGORIES_GET_ERROR,
  ADD_ERROR,
  ADD_SUCCESS,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  DELETE_ERROR,
  DELETE_SUCCESS,
} = RESPONSE_CODES;

const getAllCategories = (req: Request, res: Response) => {
  const options = {
    query: "SELECT * FROM CATEGORIES",
    errorCode: CATEGORIES_GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getPrimaryCategories = (req: Request, res: Response) => {
  const options = {
    query: "SELECT ID,NAME FROM CATEGORIES WHERE PARENT IS NULL AND SHOW=TRUE",
    errorCode: CATEGORIES_GET_ERROR,
    single: false,
  };

  getDataFromDatabase(options, res);
};

const getNonPrimaryCategories = (req: Request, res: Response) => {
  const options = {
    query: "SELECT ID,NAME FROM CATEGORIES WHERE PARENT IS NOT NULL",
    errorCode: CATEGORIES_GET_ERROR,
    single: false,
  };

  getDataFromDatabase(options, res);
};

const getSingleCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `SELECT * FROM CATEGORIES WHERE ID='${id}'`,
    errorCode: CATEGORIES_GET_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const performCategoryValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult: number = validateCategory(req.body);
  if (validationResult) {
    return res
      .status(STATUS_CODES.VALIDATION_ERROR)
      .send(`${validationResult}`);
  }
  next();
};

const checkDuplicateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const duplicateCheckResult = await duplicateCheck(
    name,
    "SELECT NAME FROM CATEGORIES"
  );
  if (duplicateCheckResult !== RESPONSE_CODES.ADD_SUCCESS) {
    return res
      .status(STATUS_CODES.VALIDATION_ERROR)
      .send(`${duplicateCheckResult}`);
  }
  next();
};

const createCategoryDBCall = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { name, show, parent, id } = req.body;
  const options = {
    query: `INSERT INTO CATEGORIES(ID,NAME, SHOW, PARENT, CREATED_DATE, UPDATED_DATE) VALUES ('${id}','${name}',${show},${
      typeof parent === "string" ? `'${parent}'` : parent
    }, '${convertDate(new Date())}',
    '${convertDate(new Date())}')`,
    successCode: ADD_SUCCESS,
    errorCode: ADD_ERROR,
    successStatusCode: STATUS_CODES.CREATED,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

const updateCategoryDBCall = (req: Request, res: Response) => {
  const { id } = req.params;
  let { name, show, parent } = req.body;
  const options = {
    query: `UPDATE CATEGORIES SET NAME='${name}', SHOW=${show}, PARENT=${
      typeof parent === "string" ? `'${parent}'` : parent
    }, UPDATED_DATE='${convertDate(new Date())}' WHERE ID='${id}'`,
    successCode: UPDATE_SUCCESS,
    errorCode: UPDATE_ERROR,
    successStatusCode: STATUS_CODES.OK,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

const deleteCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `DELETE FROM CATEGORIES WHERE ID='${id}'`,
    successCode: DELETE_SUCCESS,
    errorCode: DELETE_ERROR,
    successStatusCode: STATUS_CODES.OK,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

export default {
  getAllCategories,
  getPrimaryCategories,
  getSingleCategory,
  updateCategoryDBCall,
  deleteCategory,
  performCategoryValidation,
  createCategoryDBCall,
  checkDuplicateCategory,
  getNonPrimaryCategories,
};

import { getDataFromDatabase, handleDatabaseQuery } from "../helpers/common";
import { Request, Response } from "express";
import { STATUS_CODES } from "../constants/statusCodes";
import { v4 as uuidv4 } from "uuid";
import { validateCategory } from "../validators/categoriesValidator";
import { RESPONSE_CODES } from "../constants/responseCodes";

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
    query: "SELECT NAME FROM CATEGORIES",
    errorCode: CATEGORIES_GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getPrimaryCategories = (req: Request, res: Response) => {
  const options = {
    query: "SELECT NAME FROM CATEGORIES WHERE PARENT IS NULL AND SHOW=TRUE",
    errorCode: CATEGORIES_GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getSingleCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `SELECT *  FROM CATEGORIES WHERE ID=${id}`,
    errorCode: CATEGORIES_GET_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const addCategory = (req: Request, res: Response) => {
  const validationResult: number = validateCategory(req.body);
  if (validationResult) {
    return res
      .status(STATUS_CODES.VALIDATION_ERROR)
      .send(`${validationResult}`);
  }
  const { name, show, parent } = req.body;
  const options = {
    query: `INSERT INTO CATEGORIES(ID,NAME, SHOW, PARENT) VALUES ('${uuidv4()}','${name}',${show},${parent})`,
    successCode: ADD_SUCCESS,
    errorCode: ADD_ERROR,
    successStatusCode: STATUS_CODES.CREATED,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

const updateCategory = (req: Request, res: Response) => {
  const validationResult: number = validateCategory(req.body);
  if (validationResult) {
    return res.status(STATUS_CODES.UPDATE_ERROR).send(`${validationResult}`);
  }
  const { id } = req.params;
  const { name, show, parent } = req.body;
  const options = {
    query: `UPDATE CATEGORIES SET NAME='${name}', SHOW=${show}, PARENT=${parent} WHERE ID=${id}`,
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
    query: `DELETE FROM CATEGORIES WHERE ID=${id}`,
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
  addCategory,
  updateCategory,
  deleteCategory,
};

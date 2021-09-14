import { getDataFromDatabase, handleDatabaseQuery } from "../helpers/common";
import { Request, Response } from "express";
import { DISHES_MESSAGES } from "../constants/dishesMessages";
import { STATUS_CODES } from "../constants/statusCodes";
import { v4 as uuidv4 } from "uuid";
import { validateDish } from "../validators/dishesValidator";

const {
  GET_ERROR,
  ADD_ERROR,
  ADD_SUCCESS,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  DELETE_SUCCESS,
  DELETE_ERROR,
} = DISHES_MESSAGES;

const getAllDishes = (req: Request, res: Response) => {
  const options = {
    query: "SELECT * FROM DISHES",
    errorMessage: GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getAllVisibleDishes = (req: Request, res: Response) => {
  const options = {
    query: "SELECT * FROM DISHES WHERE SHOW=TRUE",
    errorMessage: GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getSingleDish = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `SELECT *  FROM DISHES WHERE ID=${id}`,
    errorMessage: GET_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const getAllDishesFromCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `SELECT * FROM DISHES WHERE CATEGORY IN (SELECT ID FROM CATEGORIES WHERE PARENT=${id}) AND SHOW=TRUE`,
    errorMessage: GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const addDish = (req: Request, res: Response) => {
  const validationResult: number = validateDish(req.body);
  if (validationResult) {
    return res
      .status(STATUS_CODES.VALIDATION_ERROR)
      .send(`${validationResult}`);
  }
  const { name, description, img, show, category, weights } = req.body;
  const options = {
    query: `INSERT INTO DISHES(ID, NAME, DESCRIPTION, IMG, SHOW, CATEGORY, WEIGHTS) VALUES ('${uuidv4()}','${name}', '${description}', '${img}', ${show}, ${category}, '${JSON.stringify(
      weights
    )}')`,
    successMessage: ADD_SUCCESS,
    errorMessage: ADD_ERROR,
    successStatusCode: STATUS_CODES.CREATED,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

const updateDish = (req: Request, res: Response) => {
  const validationResult: number = validateDish(req.body);
  if (validationResult) {
    return res
      .status(STATUS_CODES.VALIDATION_ERROR)
      .send(`${validationResult}`);
  }
  const { id } = req.params;
  const { name, description, img, show, category, weights } = req.body;
  const options = {
    query: `UPDATE DISHES SET NAME='${name}' ,DESCRIPTION='${description}', IMG='${img}', SHOW=${show}, CATEGORY=${category}, WEIGHTS='${JSON.stringify(
      weights
    )}' WHERE ID=${id}`,
    successMessage: UPDATE_SUCCESS,
    errorMessage: UPDATE_ERROR,
    successStatusCode: STATUS_CODES.OK,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

const deleteDish = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `DELETE FROM DISHES WHERE ID=${id}`,
    successMessage: DELETE_SUCCESS,
    errorMessage: DELETE_ERROR,
    successStatusCode: STATUS_CODES.OK,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

export default {
  getAllDishes,
  getAllVisibleDishes,
  getSingleDish,
  getAllDishesFromCategory,
  addDish,
  updateDish,
  deleteDish,
};

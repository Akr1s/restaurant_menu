import { getDataFromDatabase, handleDatabaseQuery } from "../helpers/common";
import { Request, Response } from "express";
import { CATEGORIES_MESSAGES } from "../constants/categoriesMessages";
import { STATUS_CODES } from "../constants/statusCodes";
import { v4 as uuidv4 } from "uuid";

const {
  GET_ERROR,
  ADD_SUCCESS,
  ADD_ERROR,
  UPDATE_ERROR,
  UPDATE_SUCCESS,
  DELETE_ERROR,
  DELETE_SUCCESS,
} = CATEGORIES_MESSAGES;

const getAllCategories = (req: Request, res: Response) => {
  const options = {
    query: "SELECT NAME FROM CATEGORIES",
    errorMessage: GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getPrimaryCategories = (req: Request, res: Response) => {
  const options = {
    query: "SELECT NAME FROM CATEGORIES WHERE PARENT IS NULL AND SHOW=TRUE",
    errorMessage: GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getSingleCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `SELECT *  FROM CATEGORIES WHERE ID=${id}`,
    errorMessage: GET_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const addCategory = (req: Request, res: Response) => {
  const { name, show, parent } = req.body;
  const options = {
    query: `INSERT INTO CATEGORIES(ID,NAME, SHOW, PARENT) VALUES ('${uuidv4()}','${name}',${show},${parent})`,
    successMessage: ADD_SUCCESS,
    errorMessage: ADD_ERROR,
    successStatusCode: STATUS_CODES.CREATED,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

const updateCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, show, parent } = req.body;
  const options = {
    query: `UPDATE CATEGORIES SET NAME='${name}', SHOW=${show}, PARENT=${parent} WHERE ID=${id}`,
    successMessage: UPDATE_SUCCESS,
    errorMessage: UPDATE_ERROR,
    successStatusCode: STATUS_CODES.OK,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

const deleteCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `DELETE FROM CATEGORIES WHERE ID=${id}`,
    successMessage: DELETE_SUCCESS,
    errorMessage: DELETE_ERROR,
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

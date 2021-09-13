import { getDataFromDatabase, handleDatabaseQuery } from "../helpers/common";
import { Request, Response } from "express";
import { CATEGORIES_MESSAGES } from "../constants/categoriesMessages";
import { STATUS_CODES } from "../constants/statusCodes";
import { v4 as uuidv4 } from "uuid";

const getAllCategories = (req: Request, res: Response) => {
  const options = {
    query: "SELECT NAME FROM CATEGORIES",
    errorMessage: CATEGORIES_MESSAGES.GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getPrimaryCategories = (req: Request, res: Response) => {
  const options = {
    query: "SELECT NAME FROM CATEGORIES WHERE PARENT IS NULL AND SHOW=TRUE",
    errorMessage: CATEGORIES_MESSAGES.GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getSingleCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `SELECT *  FROM CATEGORIES WHERE ID=${id}`,
    errorMessage: CATEGORIES_MESSAGES.GET_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const addCategory = (req: Request, res: Response) => {
  const { name, show, parent } = req.body;
  const options = {
    query: `INSERT INTO CATEGORIES(ID,NAME, SHOW, PARENT) VALUES ('${uuidv4()}','${name}',${show},${parent})`,
    successMessage: CATEGORIES_MESSAGES.ADD_SUCCESS,
    errorMessage: CATEGORIES_MESSAGES.ADD_ERROR,
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
    successMessage: CATEGORIES_MESSAGES.UPDATE_SUCCESS,
    errorMessage: CATEGORIES_MESSAGES.UPDATE_ERROR,
    successStatusCode: STATUS_CODES.OK,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

const deleteCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `DELETE FROM CATEGORIES WHERE ID=${id}`,
    successMessage: CATEGORIES_MESSAGES.DELETE_SUCCESS,
    errorMessage: CATEGORIES_MESSAGES.DELETE_ERROR,
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

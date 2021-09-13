import {
  getDataFromDatabase,
  addDataToDatabase,
  updateDataInDatabase,
  deleteDataFromDatabase,
} from "../helpers/common";
import { Request, Response } from "express";
import { DISHES_MESSAGES } from "../constants/dishesMessages";

const getAllDishes = (req: Request, res: Response) => {
  const options = {
    query: "SELECT * FROM DISHES",
    errorMessage: DISHES_MESSAGES.GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getAllVisibleDishes = (req: Request, res: Response) => {
  const options = {
    query: "SELECT * FROM DISHES WHERE SHOW=TRUE",
    errorMessage: DISHES_MESSAGES.GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getSingleDish = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `SELECT *  FROM DISHES WHERE ID=${id}`,
    errorMessage: DISHES_MESSAGES.GET_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const getAllDishesFromCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `SELECT * FROM DISHES WHERE CATEGORY IN (SELECT ID FROM CATEGORIES WHERE PARENT=${id}) AND SHOW=TRUE`,
    errorMessage: DISHES_MESSAGES.GET_ERROR,
    single: false,
  };
  getDataFromDatabase(options, res);
};

const addDish = (req: Request, res: Response) => {
  const { name, description, img, show, category, weights } = req.body;
  const options = {
    query: `INSERT INTO DISHES(NAME, DESCRIPTION, IMG, SHOW, CATEGORY, WEIGHTS) VALUES ('${name}', '${description}', '${img}', ${show}, ${category}, '${JSON.stringify(
      weights
    )}')`,
    successMessage: DISHES_MESSAGES.ADD_SUCCESS,
    errorMessage: DISHES_MESSAGES.ADD_ERROR,
  };
  addDataToDatabase(options, res);
};

const updateDish = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, img, show, category, weights } = req.body;
  const options = {
    query: `UPDATE DISHES SET NAME='${name}' ,DESCRIPTION='${description}', IMG='${img}', SHOW=${show}, CATEGORY=${category}, WEIGHTS='${JSON.stringify(
      weights
    )}' WHERE ID=${id}`,
    successMessage: DISHES_MESSAGES.UPDATE_SUCCESS,
    errorMessage: DISHES_MESSAGES.UPDATE_ERROR,
  };
  updateDataInDatabase(options, res);
};

const deleteDish = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `DELETE FROM DISHES WHERE ID=${id}`,
    successMessage: DISHES_MESSAGES.DELETE_SUCCESS,
    errorMessage: DISHES_MESSAGES.DELETE_ERROR,
  };
  deleteDataFromDatabase(options, res);
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

import {
  getDataFromDatabase,
  addDataToDatabase,
  updateDataInDatabase,
  deleteDataFromDatabase,
} from "../helpers/common";
import { Request, Response } from "express";

const getAllDishes = (req: Request, res: Response) => {
  const options = {
    query: "SELECT * FROM DISHES",
    errorMessage: "Dishes getAll error",
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getAllVisibleDishes = (req: Request, res: Response) => {
  const options = {
    query: "SELECT * FROM DISHES WHERE SHOW=TRUE",
    errorMessage: "Dishes getAllVisible error",
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getSingleDish = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `SELECT *  FROM DISHES WHERE ID=${id}`,
    errorMessage: "Dishes getSingle error",
    single: true,
  };
  getDataFromDatabase(options, res);
};

const getAllDishesFromCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `SELECT * FROM DISHES WHERE CATEGORY IN (SELECT ID FROM CATEGORIES WHERE PARENT=${id}) AND SHOW=TRUE`,
    errorMessage: "Dishes getAllFromCategory error",
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
    successMessage: `Dish ${name} created!`,
    errorMessage: "Dishes add error",
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
    successMessage: `Dish ${name} updated!`,
    errorMessage: "Dishes update error",
  };
  updateDataInDatabase(options, res);
};

const deleteDish = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `DELETE FROM DISHES WHERE ID=${id}`,
    successMessage: `Dish was deleted!`,
    errorMessage: "Dishes delete error",
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

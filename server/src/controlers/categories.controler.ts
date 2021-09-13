import {
  getDataFromDatabase,
  updateDataInDatabase,
  addDataToDatabase,
  deleteDataFromDatabase,
} from "../helpers/common";
import { Request, Response } from "express";

const getAllCategories = (req: Request, res: Response) => {
  const options = {
    query: "SELECT NAME FROM CATEGORIES",
    errorMessage: "Categories getAll error",
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getPrimaryCategories = (req: Request, res: Response) => {
  const options = {
    query: "SELECT NAME FROM CATEGORIES WHERE PARENT IS NULL AND SHOW=TRUE",
    errorMessage: "Categories getPrimary error",
    single: false,
  };
  getDataFromDatabase(options, res);
};

const getSingleCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `SELECT *  FROM CATEGORIES WHERE ID=${id}`,
    errorMessage: "Categories getSingle error",
    single: true,
  };
  getDataFromDatabase(options, res);
};

const addCategory = (req: Request, res: Response) => {
  const { name, show, parent } = req.body;
  const options = {
    query: `INSERT INTO CATEGORIES(NAME, SHOW, PARENT) VALUES ('${name}',${show},${parent})`,
    successMessage: `Category ${name} created!`,
    errorMessage: "Categories add error",
  };
  addDataToDatabase(options, res);
};

const updateCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, show, parent } = req.body;
  const options = {
    query: `UPDATE CATEGORIES SET NAME='${name}', SHOW=${show}, PARENT=${parent} WHERE ID=${id}`,
    successMessage: `Category ${name} updated!`,
    errorMessage: "Categories update error",
  };
  updateDataInDatabase(options, res);
};

const deleteCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const options = {
    query: `DELETE FROM CATEGORIES WHERE ID=${id}`,
    successMessage: `Category was deleted!`,
    errorMessage: "Categories delete error",
  };
  deleteDataFromDatabase(options, res);
};

export default {
  getAllCategories,
  getPrimaryCategories,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};

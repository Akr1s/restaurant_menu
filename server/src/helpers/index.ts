import { databaseQuery } from "../config/database";
import { Response } from "express";
import GetOptionsInterface from "../interfaces/getOptions";
import OptionsInterface from "../interfaces/options";

const getHelper = async (options: GetOptionsInterface, res: Response) => {
  const { query, errorMessage, single } = options;
  try {
    const { rows } = await databaseQuery(query);
    const data = single ? rows[0] : rows;
    res.status(200).send(data);
  } catch (error: any) {
    res.status(500).send({ message: errorMessage, info: error.message });
  }
};

const addHelper = async (options: OptionsInterface, res: Response) => {
  const { query, successMessage, errorMessage } = options;
  try {
    const { rows } = await databaseQuery(query);
    res.status(201).send({ message: successMessage });
  } catch (error: any) {
    res
      .status(500)
      .send({ message: errorMessage, info: error.message, stack: error.stack });
  }
};

const updateHelper = async (options: OptionsInterface, res: Response) => {
  const { query, successMessage, errorMessage } = options;
  try {
    const { rows } = await databaseQuery(query);
    res.status(200).send({ message: successMessage });
  } catch (error: any) {
    res.status(500).send({ message: errorMessage, info: error.message });
  }
};

const deleteHelper = async (options: OptionsInterface, res: Response) => {
  const { query, successMessage, errorMessage } = options;
  try {
    const { rows } = await databaseQuery(query);
    res.status(200).send({ message: successMessage });
  } catch (error: any) {
    res.status(500).send({ message: errorMessage, info: error.message });
  }
};

export { getHelper, addHelper, updateHelper, deleteHelper };

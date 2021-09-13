import { databaseQuery } from "../config/database";
import { Response } from "express";
import GetOptionsInterface from "../interfaces/getOptions";
import OptionsInterface from "../interfaces/options";
import { STATUS_CODES } from "../constants/statusCodes";

const getDataFromDatabase = async (
  options: GetOptionsInterface,
  res: Response
) => {
  const { query, errorMessage, single } = options;
  try {
    const { rows } = await databaseQuery(query);
    const data = single ? rows[0] : rows;
    res.status(STATUS_CODES.OK).send(data);
  } catch (error: any) {
    res
      .status(STATUS_CODES.ERROR)
      .send({ message: errorMessage, info: error.message });
  }
};

const addDataToDatabase = async (options: OptionsInterface, res: Response) => {
  const { query, successMessage, errorMessage } = options;
  try {
    const { rows } = await databaseQuery(query);
    res.status(STATUS_CODES.CREATED).send({ message: successMessage });
  } catch (error: any) {
    res
      .status(STATUS_CODES.ERROR)
      .send({ message: errorMessage, info: error.message, stack: error.stack });
  }
};

const updateDataInDatabase = async (
  options: OptionsInterface,
  res: Response
) => {
  const { query, successMessage, errorMessage } = options;
  try {
    const { rows } = await databaseQuery(query);
    res.status(STATUS_CODES.OK).send({ message: successMessage });
  } catch (error: any) {
    res
      .status(STATUS_CODES.ERROR)
      .send({ message: errorMessage, info: error.message });
  }
};

const deleteDataFromDatabase = async (
  options: OptionsInterface,
  res: Response
) => {
  const { query, successMessage, errorMessage } = options;
  try {
    const { rows } = await databaseQuery(query);
    res.status(STATUS_CODES.OK).send({ message: successMessage });
  } catch (error: any) {
    res
      .status(STATUS_CODES.ERROR)
      .send({ message: errorMessage, info: error.message });
  }
};

export {
  getDataFromDatabase,
  addDataToDatabase,
  updateDataInDatabase,
  deleteDataFromDatabase,
};

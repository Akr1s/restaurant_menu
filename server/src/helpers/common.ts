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

const handleDatabaseQuery = async (
  options: OptionsInterface,
  res: Response
) => {
  const {
    query,
    successMessage,
    errorMessage,
    successStatusCode,
    errorStatusCode,
  } = options;
  try {
    const { rows } = await databaseQuery(query);
    res.status(successStatusCode).send({ message: successMessage });
  } catch (error: any) {
    res
      .status(errorStatusCode)
      .send({ message: errorMessage, info: error.message });
  }
};

export { getDataFromDatabase, handleDatabaseQuery };

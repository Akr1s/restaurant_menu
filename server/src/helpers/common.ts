import { databaseQuery } from "../config/database";
import { Response } from "express";
import GetOptionsInterface from "../interfaces/getOptions";
import OptionsInterface from "../interfaces/options";
import { STATUS_CODES } from "../constants/statusCodes";

const getDataFromDatabase = async (
  options: GetOptionsInterface,
  res: Response
) => {
  const { query, errorCode, single } = options;
  try {
    const { rows } = await databaseQuery(query);
    const data = single ? rows[0] : rows;
    res.status(STATUS_CODES.OK).send(data);
  } catch (error: any) {
    res.status(STATUS_CODES.ERROR).send(errorCode);
  }
};

const handleDatabaseQuery = async (
  options: OptionsInterface,
  res: Response
) => {
  const { query, successCode, errorCode, successStatusCode, errorStatusCode } =
    options;
  try {
    await databaseQuery(query);
    res.status(successStatusCode).send(successCode);
  } catch (error: any) {
    res.status(errorStatusCode).send(errorCode);
  }
};

export { getDataFromDatabase, handleDatabaseQuery };

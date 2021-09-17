import { getDataFromDatabase, handleDatabaseQuery } from "../helpers/common";
import { Response, Request, NextFunction } from "express";
import { STATUS_CODES } from "../constants/statusCodes";
import { validateInfo } from "../validators/infoValidator";
import { RESPONSE_CODES } from "../constants/responseCodes";

const { INFO_GET_ERROR, UPDATE_ERROR, UPDATE_SUCCESS } = RESPONSE_CODES;

const getAllInfo = (req: Request, res: Response) => {
  const options = {
    query: "SELECT * FROM INFO LIMIT 1",
    errorCode: INFO_GET_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const getTitle = (req: Request, res: Response) => {
  const options = {
    query: "SELECT TITLE FROM INFO",
    errorCode: INFO_GET_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const getRestInfo = (req: Request, res: Response) => {
  const options = {
    query: "SELECT ADDRESS, TEL, WIFI FROM INFO",
    errorCode: INFO_GET_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const performInfoValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationResult: number = validateInfo(req.body);
  if (validationResult) {
    return res
      .status(STATUS_CODES.VALIDATION_ERROR)
      .send(`${validationResult}`);
  }
  next();
};

const updateInfoDBCall = (req: Request, res: Response) => {
  const { title, address, tel, wifi } = req.body;
  const options = {
    query: `UPDATE INFO SET TITLE='${title}', ADDRESS='${address}', TEL='${tel}', WIFI='${wifi}'`,
    successCode: UPDATE_SUCCESS,
    errorCode: UPDATE_ERROR,
    successStatusCode: STATUS_CODES.OK,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

export default {
  getAllInfo,
  getTitle,
  getRestInfo,
  updateInfoDBCall,
  performInfoValidation,
};

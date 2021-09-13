import { getDataFromDatabase, handleDatabaseQuery } from "../helpers/common";
import { Response, Request } from "express";
import { INFO_MESSAGES } from "../constants/infoMessages";
import { STATUS_CODES } from "../constants/statusCodes";

const {
  UPDATE_ERROR,
  UPDATE_SUCCESS,
  GET_ERROR,
  GET_REST_INFO_ERROR,
  GET_TITLE_ERROR,
} = INFO_MESSAGES;

const getAllInfo = (req: Request, res: Response) => {
  const options = {
    query: "SELECT * FROM INFO LIMIT 1",
    errorMessage: GET_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const getTitle = (req: Request, res: Response) => {
  const options = {
    query: "SELECT TITLE FROM INFO",
    errorMessage: GET_TITLE_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const getRestInfo = (req: Request, res: Response) => {
  const options = {
    query: "SELECT ADDRESS, TEL, WIFI FROM INFO",
    errorMessage: GET_REST_INFO_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const updateInfo = (req: Request, res: Response) => {
  const { title, address, tel, wifi } = req.body;
  const options = {
    query: `UPDATE INFO SET TITLE='${title}', ADDRESS='${address}', TEL='${tel}', WIFI='${wifi}'`,
    successMessage: UPDATE_SUCCESS,
    errorMessage: UPDATE_ERROR,
    successStatusCode: STATUS_CODES.OK,
    errorStatusCode: STATUS_CODES.ERROR,
  };
  handleDatabaseQuery(options, res);
};

export default {
  getAllInfo,
  getTitle,
  getRestInfo,
  updateInfo,
};

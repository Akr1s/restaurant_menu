import { getDataFromDatabase, updateDataInDatabase } from "../helpers/common";
import { Response, Request } from "express";
import { INFO_MESSAGES } from "../constants/infoMessages";

const getAllInfo = (req: Request, res: Response) => {
  const options = {
    query: "SELECT * FROM INFO LIMIT 1",
    errorMessage: INFO_MESSAGES.GET_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const getTitle = (req: Request, res: Response) => {
  const options = {
    query: "SELECT TITLE FROM INFO",
    errorMessage: INFO_MESSAGES.GET_TITLE_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const getRestInfo = (req: Request, res: Response) => {
  const options = {
    query: "SELECT ADDRESS, TEL, WIFI FROM INFO",
    errorMessage: INFO_MESSAGES.GET_REST_INFO_ERROR,
    single: true,
  };
  getDataFromDatabase(options, res);
};

const updateInfo = (req: Request, res: Response) => {
  const { title, address, tel, wifi } = req.body;
  const options = {
    query: `UPDATE INFO SET TITLE='${title}', ADDRESS='${address}', TEL='${tel}', WIFI='${wifi}'`,
    successMessage: INFO_MESSAGES.UPDATE_SUCCESS,
    errorMessage: INFO_MESSAGES.UPDATE_ERROR,
  };
  updateDataInDatabase(options, res);
};

export default {
  getAllInfo,
  getTitle,
  getRestInfo,
  updateInfo,
};

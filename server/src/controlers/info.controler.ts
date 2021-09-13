import { getHelper, updateHelper } from "../helpers/common";
import { Response, Request } from "express";

const getAllInfo = (req: Request, res: Response) => {
  const options = {
    query: "SELECT * FROM INFO LIMIT 1",
    errorMessage: "Info getAll error",
    single: true,
  };
  getHelper(options, res);
};

const getTitle = (req: Request, res: Response) => {
  const options = {
    query: "SELECT TITLE FROM INFO",
    errorMessage: "Info getTitle error",
    single: true,
  };
  getHelper(options, res);
};

const getRestInfo = (req: Request, res: Response) => {
  const options = {
    query: "SELECT ADDRESS, TEL, WIFI FROM INFO",
    errorMessage: "Info getRestInfo error",
    single: true,
  };
  getHelper(options, res);
};

const updateInfo = (req: Request, res: Response) => {
  const { title, address, tel, wifi } = req.body;
  const options = {
    query: `UPDATE INFO SET TITLE='${title}', ADDRESS='${address}', TEL='${tel}', WIFI='${wifi}'`,
    successMessage: "Information was succesfully updated!",
    errorMessage: "Info updateInfo error",
  };
  updateHelper(options, res);
};

export default {
  getAllInfo,
  getTitle,
  getRestInfo,
  updateInfo,
};

const { getHelper, updateHelper } = require("../helpers/index");

exports.getAll = (req, res) => {
  const options = {
    query: "SELECT * FROM INFO LIMIT 1",
    errorMessage: "Info getAll error",
    single: true,
  };
  getHelper(options, res);
};

exports.getTitle = (req, res) => {
  const options = {
    query: "SELECT TITLE FROM INFO",
    errorMessage: "Info getTitle error",
    single: true,
  };
  getHelper(options, res);
};

exports.getRestInfo = (req, res) => {
  const options = {
    query: "SELECT ADDRESS, TEL, WIFI FROM INFO",
    errorMessage: "Info getRestInfo error",
    single: true,
  };
  getHelper(options, res);
};

exports.updateInfo = (req, res) => {
  const { title, address, tel, wifi } = req.body;
  const options = {
    query: `UPDATE INFO SET TITLE='${title}', ADDRESS='${address}', TEL='${tel}', WIFI='${wifi}'`,
    successMessage: "Information was succesfully updated!",
    errorMessage: "Info updateInfo error",
  };
  updateHelper(options, res);
};

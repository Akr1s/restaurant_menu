const { getHelper, updateHelper } = require("../helpers/index");

exports.getAll = (req, res) => {
  getHelper("SELECT * FROM INFO LIMIT 1", "Info getAll error", res, true);
};

exports.getTitle = (req, res) => {
  getHelper("SELECT TITLE FROM INFO", "Info getTitle error", res, true);
};

exports.getRestInfo = (req, res) => {
  getHelper(
    "SELECT ADDRESS, TEL, WIFI FROM INFO",
    "Info getRestInfo error",
    res,
    true
  );
};

exports.updateInfo = (req, res) => {
  const { title, address, tel, wifi } = req.body;
  updateHelper(
    `UPDATE INFO SET TITLE='${title}', ADDRESS='${address}', TEL='${tel}', WIFI='${wifi}'`,
    "Information was succesfully updated!",
    "Info updateInfo error",
    res
  );
};

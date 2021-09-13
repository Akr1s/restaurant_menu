const {
  getHelper,
  updateHelper,
  addHelper,
  deleteHelper,
} = require("../helpers/index");

exports.getAll = (req, res) => {
  const options = {
    query: "SELECT NAME FROM CATEGORIES",
    errorMessage: "Categories getAll error",
    single: false,
  };
  getHelper(options, res);
};

exports.getPrimary = (req, res) => {
  const options = {
    query: "SELECT NAME FROM CATEGORIES WHERE PARENT IS NULL AND SHOW=TRUE",
    errorMessage: "Categories getPrimary error",
    single: false,
  };
  getHelper(options, res);
};

exports.getSingle = (req, res) => {
  const { id } = req.params;
  const options = {
    query: `SELECT *  FROM CATEGORIES WHERE ID=${id}`,
    errorMessage: "Categories getSingle error",
    single: true,
  };
  getHelper(options, res);
};

exports.add = (req, res) => {
  const { name, show, parent } = req.body;
  const options = {
    query: `INSERT INTO CATEGORIES(NAME, SHOW, PARENT) VALUES ('${name}',${show},${parent})`,
    successMessage: `Category ${name} created!`,
    errorMessage: "Categories add error",
  };
  addHelper(options, res);
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, show, parent } = req.body;
  const options = {
    query: `UPDATE CATEGORIES SET NAME='${name}', SHOW=${show}, PARENT=${parent} WHERE ID=${id}`,
    successMessage: `Category ${name} updated!`,
    errorMessage: "Categories update error",
  };
  updateHelper(options, res);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  const options = {
    query: `DELETE FROM CATEGORIES WHERE ID=${id}`,
    successMessage: `Category was deleted!`,
    errorMessage: "Categories delete error",
  };
  deleteHelper(options, res);
};

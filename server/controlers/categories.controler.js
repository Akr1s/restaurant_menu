const {
  getHelper,
  updateHelper,
  addHelper,
  deleteHelper,
} = require("../helpers/index");

exports.getAll = (req, res) => {
  getHelper(
    "SELECT NAME FROM CATEGORIES",
    "Categories getAll error",
    res,
    false
  );
};

exports.getPrimary = (req, res) => {
  getHelper(
    "SELECT NAME FROM CATEGORIES WHERE PARENT IS NULL AND SHOW=TRUE",
    "Categories getPrimary error",
    res,
    false
  );
};

exports.getSingle = (req, res) => {
  const { id } = req.params;
  getHelper(
    `SELECT *  FROM CATEGORIES WHERE ID=${id}`,
    "Categories delete error",
    res,
    true
  );
};

exports.add = (req, res) => {
  const { name, show, parent } = req.body;
  addHelper(
    `INSERT INTO CATEGORIES(NAME, SHOW, PARENT) VALUES ('${name}',${show},${parent})`,
    `Category ${name} created!`,
    "Categories add error",
    res
  );
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, show, parent } = req.body;
  updateHelper(
    `UPDATE CATEGORIES SET NAME='${name}', SHOW=${show}, PARENT=${parent} WHERE ID=${id}`,
    `Category ${name} updated!`,
    "Categories update error",
    res
  );
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  deleteHelper(
    `DELETE FROM CATEGORIES WHERE ID=${id}`,
    `Category was deleted!`,
    "Categories delete error",
    res
  );
};

exports.deleteAll = async (req, res) => {
  updateHelper(
    `DELETE FROM CATEGORIES`,
    `All categories were deleted!`,
    "Categories deleteAll error",
    res
  );
};

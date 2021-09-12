const {
  getHelper,
  addHelper,
  updateHelper,
  deleteHelper,
} = require("../helpers/index");

exports.getAll = (req, res) => {
  const options = {
    query: "SELECT * FROM DISHES",
    errorMessage: "Dishes getAll error",
    single: false,
  };
  getHelper(options, res);
};

exports.getAllVisible = (req, res) => {
  const options = {
    query: "SELECT * FROM DISHES WHERE SHOW=TRUE",
    errorMessage: "Dishes getAllVisible error",
    single: false,
  };
  getHelper(options, res);
};

exports.getSingle = (req, res) => {
  const { id } = req.params;
  const options = {
    query: `SELECT *  FROM DISHES WHERE ID=${id}`,
    errorMessage: "Dishes getSingle error",
    single: true,
  };
  getHelper(options, res);
};

exports.getAllFromCategory = (req, res) => {
  const { id } = req.params;
  const options = {
    query: `SELECT * FROM DISHES WHERE CATEGORY IN (SELECT ID FROM CATEGORIES WHERE PARENT=${id}) AND SHOW=TRUE`,
    errorMessage: "Dishes getAllFromCategory error",
    single: false,
  };
  getHelper(options, res);
};

exports.add = (req, res) => {
  const { name, description, img, show, category, weights } = req.body;
  const options = {
    query: `INSERT INTO DISHES(NAME, DESCRIPTION, IMG, SHOW, CATEGORY, WEIGHTS) VALUES ('${name}', '${description}', '${img}', ${show}, ${category}, '${JSON.stringify(
      weights
    )}')`,
    successMessage: `Dish ${name} created!`,
    errorMessage: "Dishes add error",
  };
  addHelper(options, res);
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, description, img, show, category, weights } = req.body;
  const options = {
    query: `UPDATE DISHES SET NAME='${name}' ,DESCRIPTION='${description}', IMG='${img}', SHOW=${show}, CATEGORY=${category}, WEIGHTS='${JSON.stringify(
      weights
    )}' WHERE ID=${id}`,
    successMessage: `Dish ${name} updated!`,
    errorMessage: "Dishes update error",
  };
  updateHelper(options, res);
};

exports.delete = (req, res) => {
  const { id } = req.params;
  const options = {
    query: `DELETE FROM DISHES WHERE ID=${id}`,
    successMessage: `Dish was deleted!`,
    errorMessage: "Dishes delete error",
  };
  deleteHelper(options, res);
};

exports.deleteAll = (req, res) => {
  const options = {
    query: `DELETE FROM DISHES`,
    successMessage: `All dishes were deleted!`,
    errorMessage: "Dishes deleteAll error",
  };
  deleteHelper(options, res);
};

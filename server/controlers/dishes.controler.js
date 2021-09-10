const {
  getHelper,
  addHelper,
  updateHelper,
  deleteHelper,
} = require("../helpers/index");

exports.getAll = (req, res) => {
  getHelper("SELECT * FROM DISHES", "Dishes getAll error", res, false);
};

exports.getSingle = (req, res) => {
  const { id } = req.params;
  getHelper(
    `SELECT *  FROM DISHES WHERE ID=${id}`,
    "Dishes delete error",
    res,
    true
  );
};

exports.getAllFromCategory = (req, res) => {
  const { id } = req.params;
  getHelper(
    `SELECT * FROM DISHES WHERE CATEGORY IN (SELECT ID FROM CATEGORIES WHERE PARENT=${id})`,
    "Dishes getAllFromCategory error",
    res,
    false
  );
};

exports.add = (req, res) => {
  const { name, description, img, show, category, weights } = req.body;
  addHelper(
    `INSERT INTO DISHES(NAME, DESCRIPTION, IMG, SHOW, CATEGORY, WEIGHTS) VALUES ('${name}', '${description}', '${img}', ${show}, ${category}, '${JSON.stringify(
      weights
    )}')`,
    `Dish ${name} created!`,
    "Dishes add error",
    res
  );
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, description, img, show, category, weights } = req.body;
  updateHelper(
    `UPDATE DISHES SET NAME='${name}' ,DESCRIPTION='${description}', IMG='${img}', SHOW=${show}, CATEGORY=${category}, WEIGHTS='${JSON.stringify(
      weights
    )}' WHERE ID=${id}`,
    `Dish ${name} updated!`,
    "Dishes update error",
    res
  );
};

exports.delete = (req, res) => {
  const { id } = req.params;
  deleteHelper(
    `DELETE FROM DISHES WHERE ID=${id}`,
    `Dish was deleted!`,
    "Dishes delete error",
    res
  );
};

exports.deleteAll = (req, res) => {
  deleteHelper(
    `DELETE FROM DISHES`,
    `All dishes were deleted!`,
    "Dishes deleteAll error",
    res
  );
};

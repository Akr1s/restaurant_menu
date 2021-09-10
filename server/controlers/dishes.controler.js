const db = require("../config/database");

exports.getAll = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM DISHES");
    res.status(200).send(rows);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Dishes getAll error", info: error.message });
  }
};

exports.add = async (req, res) => {
  const { name, description, img, show, category, weights } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO DISHES(NAME,DESCRIPTION, IMG, SHOW, CATEGORY, WEIGHTS) VALUES ($1,$2,$3, $4, $5, $6)",
      [name, description, img, show, category, weights]
    );
    res.status(201).send({ message: `Dish ${name} created!` });
  } catch (error) {
    res.status(500).send({ message: "Dishes add error", info: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, description, img, show, category, weights } = req.body;
  try {
    const { rows } = await db.query(
      `UPDATE DISHES SET NAME=$1 ,DESCRIPTION=$2, IMG=$3, SHOW=$4, CATEGORY=$5, WEIGHTS=$6 WHERE ID=${id}`,
      [name, description, img, show, category, weights]
    );
    res.status(200).send({ message: `Dish ${name} updated!` });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Dishes update error", info: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(`DELETE FROM DISHES WHERE ID=${id}`);
    res.status(200).send({ message: `Dish was deleted!` });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Dishes delete error", info: error.message });
  }
};

exports.getSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(`SELECT *  FROM DISHES WHERE ID=${id}`);
    res.status(200).send(rows[0]);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Dishes delete error", info: error.message });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const { rows } = await db.query(`DELETE FROM DISHES`);
    res.status(200).send({ message: `All dishes were deleted!` });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Dishes deleteAll error", info: error.message });
  }
};

exports.getAllFromCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      `SELECT * FROM DISHES WHERE CATEGORY IN (SELECT ID FROM CATEGORIES WHERE PARENT=${id})`
    );
    res.status(200).send(rows);
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Dishes getAllFromCategory error",
        info: error.message,
      });
  }
};

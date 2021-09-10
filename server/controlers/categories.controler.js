const db = require("../config/database");

exports.getAll = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT NAME FROM CATEGORIES");
    res.status(200).send(rows);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Categories getAll error", info: error.message });
  }
};

exports.getPrimary = async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT NAME FROM CATEGORIES WHERE PARENT IS NULL AND SHOW=TRUE"
    );
    res.status(200).send(rows);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Categories getPrimary error", info: error.message });
  }
};

exports.add = async (req, res) => {
  const { name, show, parent } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO CATEGORIES(NAME, SHOW, PARENT) VALUES ($1,$2,$3)",
      [name, show, parent]
    );
    res.status(201).send({ message: `Category ${name} created!` });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Categories add error", info: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, show, parent } = req.body;
  try {
    const { rows } = await db.query(
      `UPDATE CATEGORIES SET NAME=$1, SHOW=$2, PARENT=$3 WHERE ID=${id}`,
      [name, show, parent]
    );
    res.status(200).send({ message: `Category ${name} updated!` });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Categories update error", info: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(`DELETE FROM CATEGORIES WHERE ID=${id}`);
    res.status(200).send({ message: `Category was deleted!` });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Categories delete error", info: error.message });
  }
};

exports.getSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(`SELECT *  FROM CATEGORIES WHERE ID=${id}`);
    res.status(201).send(rows[0]);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Categories delete error", info: error.message });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const { rows } = await db.query(`DELETE FROM CATEGORIES`);
    res.status(200).send({ message: `All categories were deleted!` });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Categories deleteAll error", info: error.message });
  }
};

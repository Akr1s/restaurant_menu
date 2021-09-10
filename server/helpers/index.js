const db = require("../config/database");

const getHelper = async (query, errorMessage, res, single) => {
  try {
    const { rows } = await db.query(query);
    const data = single ? rows[0] : rows;
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: errorMessage, info: error.message });
  }
};

const addHelper = async (query, successMessage, errorMessage, res) => {
  try {
    const { rows } = await db.query(query);
    res.status(201).send({ message: successMessage });
  } catch (error) {
    res
      .status(500)
      .send({ message: errorMessage, info: error.message, stack: error.stack });
  }
};

const updateHelper = async (query, successMessage, errorMessage, res) => {
  try {
    const { rows } = db.query(query);
    res.status(200).send({ message: successMessage });
  } catch (error) {
    res.status(500).send({ message: errorMessage, info: error.message });
  }
};

const deleteHelper = async (query, successMessage, errorMessage, res) => {
  try {
    const { rows } = await db.query(query);
    res.status(200).send({ message: successMessage });
  } catch (error) {
    res.status(500).send({ message: errorMessage, info: error.message });
  }
};

module.exports = { getHelper, addHelper, updateHelper, deleteHelper };

const db = require("../config/database");

exports.getAll = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM INFO LIMIT 1");
    res.status(200).send(rows[0]);
  } catch (error) {
    res.status(500).send({ message: "Info getAll error", info: error.message });
  }
};

exports.getTitle = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT TITLE FROM INFO");
    res.status(200).send(rows[0]);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Info getTitle error", info: error.message });
  }
};

exports.getRestInfo = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT ADDRESS, TEL, WIFI FROM INFO");
    res.status(200).send(rows[0]);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Info getRestInfo error", info: error.message });
  }
};

exports.updateInfo = async (req, res) => {
  try {
    const { title, address, tel, wifi } = req.body;
    const { rows } = db.query(
      `UPDATE INFO SET TITLE=$1, ADDRESS=$2, TEL=$3, WIFI=$4`,
      [title, address, tel, wifi]
    );
    res.status(200).send({ message: "Information was succesfully updated!" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Info updateInfo error", info: error.message });
  }
};

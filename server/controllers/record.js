const db = require("../config");

const employeeListFetcher = (req, res) => {
  db.query(`SELECT * FROM employees WHERE status = 1`, (err, result, field) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        meta: {
          success: false,
          message: err,
        },
      });
    }
    if (result) {
      return res.status(200).json({
        meta: {
          success: true,
          message: field,
        },
        body: result,
      });
    } else {
      return res.status(404).json({
        meta: {
          success: false,
          message: "not found!",
        },
      });
    }
  });
};

const employeeDetailFetcher = (req, res) => {
  db.query(`SELECT * FROM employees WHERE status = 1`, (err, result, field) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        meta: {
          success: false,
          message: err,
        },
      });
    }
    if (result) {
      return res.status(200).json({
        meta: {
          success: true,
          message: field,
        },
        body: result,
      });
    } else {
      return res.status(404).json({
        meta: {
          success: false,
          message: "not found!",
        },
      });
    }
  });
};

const employeeCreator = (req, res) => {
  db.query(`SELECT * FROM employees WHERE status = 1`, (err, result, field) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        meta: {
          success: false,
          message: err,
        },
      });
    }
    if (result) {
      return res.status(200).json({
        meta: {
          success: true,
          message: field,
        },
        body: result,
      });
    } else {
      return res.status(404).json({
        meta: {
          success: false,
          message: "not found!",
        },
      });
    }
  });
};

const employeeEditor = (req, res) => {
  db.query(`SELECT * FROM employees WHERE status = 1`, (err, result, field) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        meta: {
          success: false,
          message: err,
        },
      });
    }
    if (result) {
      return res.status(200).json({
        meta: {
          success: true,
          message: field,
        },
        body: result,
      });
    } else {
      return res.status(404).json({
        meta: {
          success: false,
          message: "not found!",
        },
      });
    }
  });
};

const employee = {
  employeeListFetcher,
  employeeDetailFetcher,
  employeeCreator,
  employeeEditor,
};

module.exports = employee;

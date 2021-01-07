const Bank = require("../models/bank.model.js");

// Create and Save a new Bank
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Bank
      const bank = new Bank({
        no_rekening : req.body.no_rekening,
        nama_rekening: req.body.nama_rekening,
        nama_bank: req.body.nama_bank,
        logo_bank: req.body.logo_bank
      });
    
      // Save Bank in the database
      Bank.create(bank, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Bank Account."
          });
        else res.send(data);
      });
};

// Retrieve all Bank from the database.
exports.findAll = (req, res) => {
    Bank.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving bank account."
          });
        else res.send(data);
      });
};

// Find a single Bank with a bankId
exports.findOne = (req, res) => {
    Bank.findById(req.params.bankId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Bank with no rekening ${req.params.bankId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving bank with id " + req.params.bankId
            });
          }
        } else res.send(data);
      });
};

//Update an Object
exports.update = (req,res) => {
  if(!req.body){
    res.status(400).send({
      message: "Can not be empty"
    });
  }

  Bank.updateById(
    req.params.bankId,
    new Bank(req.body),
    (err, data) => {
      if(err){
        if(err.kind === 'not_found'){
          res.status(404).send({
            message: "not found bank with no rekening ${req.params.bankId}."
          });
        } else {
          res.status(500).send({
            message: "Error updating bank with no rekening" + req.params.bankId
          });
        }
      } else res.send(data);
    }
  );
};

//deleted an object
exports.delete = (req,res) => {
  Bank.remove(req.params.bankId, (err, data) => {
    if(err){
      if(err.kind === 'not_found'){
        res.status(404).send({
          message: "not found bank with no rekening " + req.params.bankId
        });
      } else {
        res.status(500).send({
          message: "Error deleting bank with no rekening" + req.params.bankId
        });
      }
    } else res.send({message: "Bank account was deleted"});
  });
};

exports.deleteAll = (req,res) => {
  Bank.removeAll((err, data) => {
    if(err)
      res.status(500).send({
        message: err.message || "Some error occured while removing all bank"
      });
    else res.send({message: "All bank were deleted successfully"});
  });
};


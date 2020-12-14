const Customer = require("../models/pengguna.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      const customer = new Customer({
        id : req.body.id,
        nama: req.body.nama,
        email: req.body.email,
        nohp: req.body.nohp,
        password: req.body.password
      });
    
      // Save Customer in the database
      Customer.create(customer, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer."
          });
        else res.send(data);
      });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
          });
        else res.send(data);
      });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving pengguna with id " + req.params.customerId
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

  Customer.updateById(
    req.params.customerId,
    new Customer(req.body),
    (err, data) => {
      if(err){
        if(err.kind === 'not_found'){
          res.status(404).send({
            message: "not found pengguna with id ${req.params.customerId}."
          });
        } else {
          res.status(500).send({
            message: "Error updating pengguna with id" + req.params.customerId
          });
        }
      } else res.send(data);
    }
  );
};

//deleted an object
exports.delete = (req,res) => {
  Customer.remove(req.params.customerId, (err, data) => {
    if(err){
      if(err.kind === 'not_found'){
        res.status(404).send({
          message: "not found pengguna with id ${req.params.customerId}."
        });
      } else {
        res.status(500).send({
          message: "Error deleting pengguna with id" + req.params.customerId
        });
      }
    } else res.send({message: "Pengguna was deleted"});
  });
};

exports.deleteAll = (req,res) => {
  Customer.removeAll((err, data) => {
    if(err)
      res.status(500).send({
        message: err.message || "Some error occured while removing all pengguna"
      });
    else res.send({message: "All pengguna were deleted successfully"});
  });
};


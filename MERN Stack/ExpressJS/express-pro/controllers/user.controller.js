const User = require("../models/user.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Customer
      const user = new User({
        pegawai_id: req.body.pegawai_id,
        pegawai_nama: req.body.pegawai_nama,
        pegawai_gaji: req.body.pegawai_gaji
      });
    
      // Save Customer in the database
      User.create(user, (err, data) => {
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
    User.getAll((err, data) => {
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
    User.findById(req.params.userId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.userId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.userId
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

  User.updateById(
    req.params.userId,
    new User(req.body),
    (err, data) => {
      if(err){
        if(err.kind === 'not_found'){
          res.status(404).send({
            message: "not found pegawai with id ${req.params.userId}."
          });
        } else {
          res.status(500).send({
            message: "Error updating pegawai with id" + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};

//deleted an object
exports.delete = (req,res) => {
  User.remove(req.params.userId, (err, data) => {
    if(err){
      if(err.kind === 'not_found'){
        res.status(404).send({
          message: "not found pegawai with id ${req.params.userId}."
        });
      } else {
        res.status(500).send({
          message: "Error deleting pegawai with id" + req.params.userId
        });
      }
    } else res.send({message: "Pegawai was deleted"});
  });
};

exports.deleteAll = (req,res) => {
  User.removeAll((err, data) => {
    if(err)
      res.status(500).send({
        message: err.message || "Some error occured while removing all pegawai"
      });
    else res.send({message: "All pegawai were deleted successfully"});
  });
};


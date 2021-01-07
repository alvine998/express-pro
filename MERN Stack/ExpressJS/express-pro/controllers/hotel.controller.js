const Hotel = require("../models/hotel.model.js");

// Create and Save a new Bank
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      // Create a Hotel
      const hotel = new Hotel({
        id: req.body.id,
        kategori : req.body.kategori,
        id_manager: req.body.id_manager,
        nama_hotel: req.body.nama_hotel,
        rating: req.body.rating,
        alamat: req.body.alamat,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        longlat: req.body.longlat,
        deskripsi: req.body.deskripsi,
        kamar_aktif: req.body.kamar_aktif,
        foto: req.body.foto,
      });
    
      // Save Hotel in the database
      Hotel.create(hotel, (err, data) => {
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
    Hotel.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving bank account."
          });
        else res.send(data);
      });
};

// Find a single Hotel with a hotelId
exports.findOne = (req, res) => {
    Hotel.findById(req.params.hotelId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Bank with no rekening ${req.params.hotelId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving bank with id " + req.params.hotelId
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

  Hotel.updateById(
    req.params.hotelId,
    new Hotel(req.body),
    (err, data) => {
      if(err){
        if(err.kind === 'not_found'){
          res.status(404).send({
            message: "not found bank with no rekening " + req.params.hotelId
          });
        } else {
          res.status(500).send({
            message: "Error updating bank with no rekening" + req.params.hotelId
          });
        }
      } else res.send(data);
    }
  );
};

//deleted an object
exports.delete = (req,res) => {
  Hotel.remove(req.params.hotelId, (err, data) => {
    if(err){
      if(err.kind === 'not_found'){
        res.status(404).send({
          message: "not found Hotel with id " + req.params.hotelId
        });
      } else {
        res.status(500).send({
          message: "Error deleting Hotel with id" + req.params.hotelId
        });
      }
    } else res.send({message: "Hotel account was deleted"});
  });
};

exports.deleteAll = (req,res) => {
  Hotel.removeAll((err, data) => {
    if(err)
      res.status(500).send({
        message: err.message || "Some error occured while removing all hotel"
      });
    else res.send({message: "All hotel were deleted successfully"});
  });
};


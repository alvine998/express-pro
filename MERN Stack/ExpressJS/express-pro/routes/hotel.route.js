module.exports = app => {
    const hotel = require("../controllers/hotel.controller.js");
  
    // Create a new Bank Account
    app.post("/hotel", hotel.create);
  
    // Retrieve all Bank Account
    app.get("/hotel", hotel.findAll);
  
    // Retrieve a single hotel Account with hotelId
    app.get("/hotel/:hotelId", hotel.findOne);

    //Update a hotel Account with hotelId
    app.put('/hotel/:hotelId', hotel.update);

    //Delete a hotel Account with hotelId
    app.delete('/hotel/:hotelId', hotel.delete);

    //Delete All hotel Account
    app.delete('/hotel', hotel.deleteAll);
};
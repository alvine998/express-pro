module.exports = app => {
    const customer = require("../controllers/pengguna.controller.js");
  
    // Create a new Pegawai
    app.post("/customer", customer.create);
  
    // Retrieve all Pegawai
    app.get("/customer", customer.findAll);
  
    // Retrieve a single Pegawai with userId
    app.get("/customer/:customerId", customer.findOne);

    //Update a Pegawai with userId
    app.put('/customer/:customerId', customer.update);

    //Delete a Pegawai with userId
    app.delete('/customer/:customerId', customer.delete);

    //Delete All Pegawai
    app.delete('/customer', customer.deleteAll);
};
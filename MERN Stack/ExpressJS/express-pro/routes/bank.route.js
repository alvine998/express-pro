module.exports = app => {
    const bank = require("../controllers/bank.controller.js");
  
    // Create a new Bank Account
    app.post("/bank", bank.create);
  
    // Retrieve all Bank Account
    app.get("/bank", bank.findAll);
  
    // Retrieve a single Bank Account with bankId
    app.get("/bank/:bankId", bank.findOne);

    //Update a Bank Account with bankId
    app.put('/bank/:bankId', bank.update);

    //Delete a Bank Account with bankId
    app.delete('/bank/:bankId', bank.delete);

    //Delete All Bank Account
    app.delete('/bank', bank.deleteAll);
};
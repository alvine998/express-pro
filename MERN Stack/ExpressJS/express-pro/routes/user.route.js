module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    // Create a new Customer
    app.post("/user", user.create);
  
    // Retrieve all Customers
    app.get("/user", user.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/user/:userId", user.findOne);
};
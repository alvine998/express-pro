module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    // Create a new Pegawai
    app.post("/user", user.create);
  
    // Retrieve all Pegawai
    app.get("/user", user.findAll);
  
    // Retrieve a single Pegawai with userId
    app.get("/user/:userId", user.findOne);

    //Update a Pegawai with userId
    app.put('/user/:userId', user.update);

    //Delete a Pegawai with userId
    app.delete('/user/:userId', user.delete);

    //Delete All Pegawai
    app.delete('/user', user.deleteAll);
};
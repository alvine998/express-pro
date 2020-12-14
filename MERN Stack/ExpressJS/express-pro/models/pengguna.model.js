const sql = require("./db.js");

// constructor
const Customer = function(customer) {
    this.id = customer.id;
    this.nama = customer.nama;
    this.email = customer.email;
    this.nohp = customer.nohp;
    this.password = customer.password;
  };

  Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO pengguna SET ?", newCustomer, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created pengguna: ", {  ...newCustomer });
      result(null, {  ...newCustomer });
    });
  };

  Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM pengguna WHERE id = ${customerId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found pengguna: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  Customer.getAll = result => {
    sql.query("SELECT * FROM pengguna", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("pengguna: ", res);
      result(null, res);
    });
  };


  Customer.updateById = (id, customer, result) => {
    sql.query(
      "update pengguna set nama = ?, email = ?, nohp = ?, password = ? where id = ?",
      [customer.nama, customer.email, customer.nohp, customer.password, id],
      (err,res) => {
        if(err){
          console.log("error : ", err);
          result(null,err);
          return;
        }

        if(res.affectedRows == 0) {
          result({kind: "not_found"}, null);
          return;
        }

        console.log("Updated pengguna: ", {id:id, ...customer});
        result(null, {id: id, ...customer});
      }
    );
  };

  Customer.remove = (id,result) => {
    sql.query("delete from pengguna where id = ?", id, (err,res) => {
      if(err) {
        console.log("error: ", err);
        result(null,err);
        return;
      }

      if(res.affectedRows == 0) {
        result({kind: "not_found"}, null);
        return;
      }

      console.log("deleted pengguna with id: ", id);
      result(null,res);
    });
  };

  Customer.removeAll = result => {
    sql.query("delete from pengguna", (err,res) => {
      if(err) {
        console.log("error: ", err);
        result(null,err);
        return;
      }

      console.log('deleted ${res.affectedRows} pengguna');
      result(null,res);
    })
  }
  module.exports = Customer;
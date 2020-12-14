const sql = require("./db.js");

// constructor
const User = function(user) {
    this.pegawai_id = user.pegawai_id;
    this.pegawai_nama = user.pegawai_nama;
    this.pegawai_gaji = user.pegawai_gaji;
  };

  User.create = (newUser, result) => {
    sql.query("INSERT INTO pegawai SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", {  ...newUser });
      result(null, {  ...newUser });
    });
  };

  User.findById = (userId, result) => {
    sql.query(`SELECT * FROM pegawai WHERE id = ${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  User.getAll = result => {
    sql.query("SELECT * FROM pegawai", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("user: ", res);
      result(null, res);
    });
  };


  User.updateById = (id, user, result) => {
    sql.query(
      "update pegawai set pegawai_nama = ?, pegawai_gaji = ? where pegawai_id = ?",
      [user.pegawai_nama, user.pegawai_gaji, id],
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

        console.log("Updated user: ", {id:id, ...user});
        result(null, {id: id, ...user});
      }
    );
  };

  User.remove = (id,result) => {
    sql.query("delete from pegawai where pegawai_id = ?", id, (err,res) => {
      if(err) {
        console.log("error: ", err);
        result(null,err);
        return;
      }

      if(res.affectedRows == 0) {
        result({kind: "not_found"}, null);
        return;
      }

      console.log("deleted user with id: ", id);
      result(null,res);
    });
  };

  User.removeAll = result => {
    sql.query("delete from pegawai", (err,res) => {
      if(err) {
        console.log("error: ", err);
        result(null,err);
        return;
      }

      console.log('deleted ${res.affectedRows} pegawai');
      result(null,res);
    })
  }
  module.exports = User;
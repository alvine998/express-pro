const sql = require("./db.js");

// constructor
const Bank = function(bank) {
    this.id = bank.id;
    this.no_rekening = bank.no_rekening;
    this.nama_rekening = bank.nama_rekening;
    this.nama_bank = bank.nama_bank;
    this.logo_bank = bank.logo_bank;
  };

  Bank.create = (newAkunbank, result) => {
    sql.query("INSERT INTO bank_akun SET ?", newAkunbank, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created akun bank: ", {  ...newAkunbank });
      result(null, {  ...newAkunbank });
    });
  };

  Bank.findById = (bankId, result) => {
    sql.query(`SELECT * FROM bank_akun WHERE id = ${bankId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Akun Bank Ditemukan : ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Bank with the id
      result({ kind: "not_found" }, null);
    });
  };

  Bank.getAll = result => {
    sql.query("SELECT * FROM bank_akun", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Akun Bank: ", res);
      result(null, res);
    });
  };


  Bank.updateById = (id, bank, result) => {
    sql.query(
      "update bank_akun set no_rekening = ?, nama_rekening = ?, nama_bank = ?, logo_bank = ? where id = ? ",
      [bank.no_rekening, bank.nama_rekening, bank.nama_bank, bank.logo_bank, id],
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

        console.log("Updated akun bank: ", {id:id, ...bank});
        result(null, {id: id, ...bank});
      }
    );
  };

  Bank.remove = (id,result) => {
    sql.query("delete from bank_akun where id = ?", id, (err,res) => {
      if(err) {
        console.log("error: ", err);
        result(null,err);
        return;
      }

      if(res.affectedRows == 0) {
        result({kind: "not_found"}, null);
        return;
      }

      console.log("Hapus akun bank dengan id: ", no_rekening);
      result(null,res);
    });
  };

  Bank.removeAll = result => {
    sql.query("delete from bank_akun", (err,res) => {
      if(err) {
        console.log("error: ", err);
        result(null,err);
        return;
      }

      console.log('deleted ${res.affectedRows} bank_akun');
      result(null,res);
    })
  }
  module.exports = Bank;
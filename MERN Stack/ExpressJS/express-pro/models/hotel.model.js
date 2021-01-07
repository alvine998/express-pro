const sql = require("./db.js");

// constructor
const Hotel = function(hotel) {
    this.id = hotel.id;
    this.kategori = hotel.kategori;
    this.id_manager = hotel.id_manager;
    this.nama_hotel = hotel.nama_hotel;
    this.rating = hotel.rating;
    this.alamat = hotel.alamat;
    this.longitude = hotel.longitude;
    this.latitude = hotel.latitude;
    this.longlat = hotel.longlat;
    this.deskripsi = hotel.deskripsi;
    this.kamar_aktif = hotel.kamar_aktif;
    this.foto = hotel.foto;
  };

  Hotel.create = (newHotel, result) => {
    sql.query("INSERT INTO hotel SET ?", newHotel, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created akun hotel: ", {  ...newHotel });
      result(null, {  ...newHotel });
    });
  };

  Hotel.findById = (hotelId, result) => {
    sql.query(`SELECT * FROM hotel WHERE id = ${hotelId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("Akun Hotel Ditemukan : ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Hotel with the id
      result({ kind: "not_found" }, null);
    });
  };

  Hotel.getAll = result => {
    sql.query("SELECT * FROM hotel", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Akun Hotel: ", res);
      result(null, res);
    });
  };


  Hotel.updateById = (id, hotel, result) => {
    sql.query(
      "update hotel set kategori = ?, id_manager = ?, nama_hotel = ?, rating = ?, alamat = ?, longitude = ?, latitude = ?, longlat = ?, deskripsi = ? , kamar_aktif = ?, foto = ? where id = ? ",
      [hotel.kategori, hotel.id_manager, hotel.nama_hotel, hotel.rating, hotel.alamat, hotel.longitude, hotel.latitude, hotel.longlat, hotel.deskripsi, hotel.kamar_aktif, hotel.foto,  id],
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

        console.log("Updated akun hotel: ", {id:id, ...hotel});
        result(null, {id: id, ...hotel});
      }
    );
  };

  Hotel.remove = (id,result) => {
    sql.query("delete from hotel where id = ?", id, (err,res) => {
      if(err) {
        console.log("error: ", err);
        result(null,err);
        return;
      }

      if(res.affectedRows == 0) {
        result({kind: "not_found"}, null);
        return;
      }

      console.log("Hapus akun hotel dengan id: ", id);
      result(null,res);
    });
  };

  Hotel.removeAll = result => {
    sql.query("delete from hotel", (err,res) => {
      if(err) {
        console.log("error: ", err);
        result(null,err);
        return;
      }

      console.log('deleted '+ res.affectedRows + 'bank_akun');
      result(null,res);
    })
  }
  module.exports = Hotel;
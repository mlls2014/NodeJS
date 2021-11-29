const sql = require("./db.js");

// Implementación del modelo User con notación clase ES6
class Role {

   constructor(role) {
      this.name = role.name;
   };

   static create(newRole, result) {
      sql.query("INSERT INTO roles SET ?", newRole, (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created role: ", { id: res.insertId, ...newRole });
         result(null, { id: res.insertId, ...newRole });
      });
   }

   static getAll(name, result) {  //result es un callback
      let query = "SELECT * FROM roles";

      if (name) {
         query += ` WHERE name LIKE '%${name}%'`;
      }

      sql.query(query, (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(null, err);  // llamada a callback
            return;
         }

         console.log("role: ", res);
         result(null, res);
      });
   }

   static findById(id, result) {
      sql.query(`SELECT * FROM roles WHERE id = ${id}`, (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }
         console.log("found role: ", res);
         result(null, res);
      });
   }

   // static updateById(id, user, result) {
   //    sql.query(
   //       "UPDATE users SET username = ?, description = ?, published = ? WHERE id = ?",
   //       [user.username, user.email, user.password, id],
   //       (err, res) => {
   //          if (err) {
   //             console.log("error: ", err);
   //             result(null, err);
   //             return;
   //          }

   //          console.log("updated user: ", { id: id, ...user });
   //          result(null, { id: id, ...user });
   //       }
   //    );
   // };

   // static remove(id, result) {
   //    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
   //       if (err) {
   //          console.log("error: ", err);
   //          result(null, err);
   //          return;
   //       }

   //       console.log("deleted user with id: ", id);
   //       result(null, res);
   //    });
   // }

   // static removeAll(result) {
   //    sql.query("DELETE FROM users", (err, res) => {
   //       if (err) {
   //          console.log("error: ", err);
   //          result(null, err);
   //          return;
   //       }

   //       console.log(`deleted ${res.affectedRows} users`);
   //       result(null, res);
   //    });
   // }
}

module.exports = Role;
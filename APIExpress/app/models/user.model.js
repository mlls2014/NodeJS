const sql = require("./db.js");
const halson = require('halson');

// Implementación del modelo User con notación clase ES6
class User {

   constructor(user) {
      this.username = user.username;
      this.email = user.email;
      this.password = user.password;
   };

   static create(newUser, result) {
      sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("created user: ", { id: res.insertId, ...newUser });
         result(null, { id: res.insertId, ...newUser });
      });
   }

   static getAll(username, result) {  //result es un callback
      let query = "SELECT * FROM users";

      if (username) {
         query += ` WHERE username LIKE '%${username}%'`;
      }

      sql.query(query, (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);  // llamada a callback
            return;
         }

         console.log("user: ", res);
         // Aquí podríamos añadir HATEOAS
         var res = halson(res)
            .addLink('self', '/api/user')
            .addLink('author', {
               href: '/api/user?username=Juan',
               title: 'Usuario Juan'
            });
         result(null, res);
      });
   }

   // IMPLEMENTACIÓN ERRÓNEA, no se puede capturar el return a tiempo
   // static getAll (username) {
   //    let query = "SELECT * FROM users";

   //    if (username) {
   //       query += ` WHERE username LIKE '%${username}%'`;
   //    }

   //    sql.query(query, (err, res) => {
   //       if (err) {
   //          console.log("error: ", err);
   //          return { err: err, res: null };

   //       }

   //       console.log("user: ", res);
   //       return { err: null, res: res };;
   //    });
   // }


   static findById(id, result) {
      sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }
         result(null, res);
      });
   }

   static updateById(id, user, result) {
      sql.query(
         "UPDATE users SET username = ?, description = ?, published = ? WHERE id = ?",
         [user.username, user.email, user.password, id],
         (err, res) => {
            if (err) {
               console.log("error: ", err);
               result(err, null);
               return;
            }

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
         }
      );
   };

   static remove(id, result) {
      sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log("deleted user with id: ", id);
         result(null, res);
      });
   }

   static removeAll(result) {
      sql.query("DELETE FROM users", (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }

         console.log(`deleted ${res.affectedRows} users`);
         result(null, res);
      });
   }

   static getRoles(id, result) {
      sql.query('SELECT roles.* FROM users JOIN user_roles ON users.id = user_roles.userId ' +
         'JOIN roles ON roles.id = user_roles.roleId ' +
         `WHERE users.id = ${id}`, (err, res) => {
         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }
         console.log("found roles: ", res);
         result(null, res);
      }); 
   }

   static findByColumn(column, value, result) {
      sql.query(`SELECT * FROM users WHERE ${column} = '${value}'`, (err, res) => {

         if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
         }
         console.log("found user: ", res);
         result(null, res);
      });
   }
}

module.exports = User;
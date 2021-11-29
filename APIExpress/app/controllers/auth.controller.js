const config = require("../config/auth.config");
const Role = require("../models/role.model.js");
const User = require("../models/user.model.js");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//cambiar
exports.signup = (req, res) => {
   // Save User to Database
   User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
   })
      .then(user => {
         if (req.body.roles) {
            Role.findAll({
               where: {
                  name: {
                     [Op.or]: req.body.roles
                  }
               }
            }).then(roles => {
               user.setRoles(roles).then(() => {
                  res.send({ message: "User registered successfully!" });
               });
            });
         } else {
            // user role = 1
            user.setRoles([1]).then(() => {
               res.send({ message: "User registered successfully!" });
            });
         }
      })
      .catch(err => {
         res.status(500).send({ message: err.message });
      });
};

exports.signin = (req, res) => {
   User.findByColumn('username', req.body.username, (err, user) => {
      if (err) {
         if (err.kind === "not_found") {
            res.status(404).send({
               message: `Not found User ${req.body.username}` + JSON.stringify(err)
            });
         } else {
            res.status(500).send({
               message: "Error retrieving User in login"
            });
         }
      } else {

         // var passwordIsValid = bcrypt.compareSync(
         //    req.body.password,
         //    user.password
         // );
         var passwordIsValid = (req.body.password==user.password);  //saltamos bcrypt

         if (!passwordIsValid) {
            return res.status(401).send({
               accessToken: null,
               message: "Invalid Password!"
            });
         }

         var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
         });

         var authorities = [];

         User.getRoles(user.id, (err, data) => {
            for (let i = 0; i < data.length; i++) {
               authorities.push("ROLE_" + data[i].name.toUpperCase());
            }
            res.status(200).send({
               id: user.id,
               username: user.username,
               email: user.email,
               roles: authorities,
               accessToken: token
            });
         });
      }
   });
};

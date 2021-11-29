const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/user.model.js");

verifyToken = (req, res, next) => {
   let token = req.headers["x-access-token"];

   if (!token) {
      return res.status(403).send({
         message: "No token provided!"
      });
   }

   jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
         return res.status(401).send({
            message: "Unauthorized!"
         });
      }
      req.userId = decoded.id;
      next();
   });
};

isAdmin = (req, res, next) => {
   // Mirar los roles del usuario y chequear que tenga admin
   User.getRoles(req.userId, (err, data) => {
      if (err) { // Se supone que el usuario ya existe
         res.status(500).send({
            message: "Error retrieving roles from User with id " + req.params.id
         });
      } else {
         for (let i = 0; i < data.length; i++) {
            if (data[i].name === "admin") {
               next();
               return;
            }
         }
         res.status(403).send({
            message: "Require Admin Role!"
         });
      }
   });
};

isModerator = (req, res, next) => {
   // Mirar los roles del usuario y chequear que tenga admin
   User.getRoles(req.userId, (err, data) => {
      if (err) { // Se supone que el usuario ya existe pero aquí se controla que no exista
         res.status(500).send({
            message: "Error retrieving roles from User with id " + req.params.id
         });
      } else {
         for (let i = 0; i < data.length; i++) {
            if (data[i].name === "moderator") {
               next();
               return;
            }
         }
         res.status(403).send({
            message: "Require Moderator Role!"
         });
      }
   });
};

isModeratorOrAdmin = (req, res, next) => {
   // Mirar los roles del usuario y chequear que tenga admin
   User.getRoles(req.userId, (err, data) => {
      if (err) { // Se supone que el usuario ya existe pero aquí se controla que no exista
         res.status(500).send({
            message: "Error retrieving roles from User with id " + req.params.id
         });
      } else {
         for (let i = 0; i < data.length; i++) {
            if (data[i].name === "admin" || data[i].name === "moderator") {
               next();
               return;
            }
         }
         res.status(403).send({
            message: "Require Moderator or Admin Role!"
         });
      }
   });
};

const authJwt = {
   verifyToken: verifyToken,
   isAdmin: isAdmin,
   isModerator: isModerator,
   isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;

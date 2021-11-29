const Role = require("../models/role.model.js");
const User = require("../models/user.model.js");

checkDuplicateUsernameOrEmail = (req, res, next) => {
   // Username
   User.findByColumn('username', req.body.username, (err, data) => {
      if (err) {
         if (err.kind === "not_found") {
            User.findByColumn('email', req.body.email, (err, data) => {
               if (err) {
                  if (err.kind === "not_found") {
                     next();
                  } else {
                     res.status(500).send({
                        message: "Error retrieving User with email " + req.body.username
                     });
                     return;
                  }
               } else {
                  res.status(400).send({
                     message: "Failed! email is already in use!"
                  });
                  return;
               }
            });
         } else {
            res.status(500).send({
               message: "Error retrieving User with id " + req.params.id
            });
            return;
         }
      } else {
         res.status(400).send({
            message: "Failed! Username is already in use!"
         });
         return;
      }
   });
}

// cambiar
checkRolesExisted = (req, res, next) => {
   if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
         if (!ROLES.includes(req.body.roles[i])) {
            res.status(400).send({
               message: "Failed! Role does not exist = " + req.body.roles[i]
            });
            return;
         }
      }
   }

   next();
};

const verifySignUp = {
   checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
   checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;

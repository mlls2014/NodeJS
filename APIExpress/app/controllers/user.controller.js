const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!"
      });
   }

   // Create a User
   const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password || false
   });

   // Save User in the database
   User.create(user, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the user."
         });
      else res.send(data);
   });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
   const user = req.query.username;


   User.getAll(user, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving users."
         });
      else res.send(data);
   });
};

// Implementación errónea User.getAll es asíncrona y result no estaría disponible y console.log(result) result estaría indefinido
// exports.findAll = (req, res) => {
//    const user = req.query.user;


//    result = User.getAll(user)
//    console.log(result);
//    if (result.err)
//        res.status(500).send({
//          message: err.message || "Some error occurred while retrieving users." });
//    else
//       res.send(result.res);
// };

// Find a single User with a id
exports.findOne = (req, res) => {
   User.findById(req.params.id, (err, data) => {
      if (err) {
         res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
         });
      } else {
         res.send(data);
      }
   });
};

// // Update a Tutorial identified by the id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//    res.status(400).send({
//      message: "Content can not be empty!"
//    });
//  }

//  console.log(req.body);

//  Tutorial.updateById(
//    req.params.id,
//    new Tutorial(req.body),
//    (err, data) => {
//      if (err) {
//        if (err.kind === "not_found") {
//          res.status(404).send({
//            message: `Not found Tutorial with id ${req.params.id}.`
//          });
//        } else {
//          res.status(500).send({
//            message: "Error updating Tutorial with id " + req.params.id
//          });
//        }
//      } else res.send(data);
//    }
//  );
// };

// exports.delete = (req, res) => {
//    Tutorial.remove(req.params.id, (err, data) => {
//      if (err) {
//          res.status(500).send({
//            message: "Could not delete Tutorial with id " + req.params.id
//          });
//      } else res.send({ message: `Tutorial was deleted successfully!` });
//    });
//  };

//  exports.deleteAll = (req, res) => {
//    Tutorial.removeAll((err, data) => {
//      if (err)
//        res.status(500).send({
//          message:
//            err.message || "Some error occurred while removing all tutorials."
//        });
//      else res.send({ message: `All Tutorials were deleted successfully!` });
//    });
//  };

// Get roles of single User with a id
exports.getRoles = (req, res) => {
   User.getRoles(req.params.id, (err, data) => {
      if (err) {
         res.status(500).send({
            message: "Error retrieving Roles from user with id " + req.params.id
         });
      } else res.send(data);
   });
};
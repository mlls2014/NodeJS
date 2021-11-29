const Role = require("../models/role.model.js");

// Create and Save a new Role
exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
      res.status(400).send({
         message: "Content can not be empty!"
      });
   }

   // Create a Role
   const role = new Role({
      name: req.body.name,
   });

   // Save Role in the database
   Role.create(role, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while creating the role."
         });
      else res.send(data);
   });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
   const role = req.query.name;

   Role.getAll(role, (err, data) => {
      if (err)
         res.status(500).send({
            message:
               err.message || "Some error occurred while retrieving roles."
         });
      else res.send(data);
   });
};

// Find a single Role with a id
exports.findOne = (req, res) => {
   Role.findById(req.params.id, (err, data) => {
      if (err) {
         res.status(500).send({
            message: "Error retrieving Role with id " + req.params.id
         });
      } else res.send(data);
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
//        if (err.kind === "not_found") {
//          res.status(404).send({
//            message: `Not found Tutorial with id ${req.params.id}.`
//          });
//        } else {
//          res.status(500).send({
//            message: "Could not delete Tutorial with id " + req.params.id
//          });
//        }
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
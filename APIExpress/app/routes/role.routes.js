module.exports = app => {
   const role = require("../controllers/role.controller.js");
 
   var router = require("express").Router();
 
   // Create a new Role
   router.post("/", role.create);
 
   // Retrieve all Roles
   router.get("/", role.findAll);
 
   // // Retrieve all published Roles
   // router.get("/published", tutorials.findAllPublished);
 
   // // Retrieve a single Role with id
   router.get("/:id", role.findOne);
 
   // // Update a Role with id
   // router.put("/:id", tutorials.update);
 
   // // Delete a Role with id
   // router.delete("/:id", tutorials.delete);
 
   // // Delete all Roles
   // router.delete("/", tutorials.deleteAll);
 
   app.use('/api/role', router);
 };
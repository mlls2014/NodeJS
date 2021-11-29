const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller.js");

module.exports = app => {
   let router = require("express").Router();
   // Create a new User
   router.post("/", [authJwt.verifyToken], user.create);
 
   // Retrieve all Tutorials
   router.get("/", [authJwt.verifyToken], user.findAll);
 
   // Retrieve a single User with id
   router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], user.findOne);
 
   // // Update a Tutorial with id
   // router.put("/:id", user.update);
 
   // // Delete a Tutorial with id
   // router.delete("/:id", user.delete);
 
   // // Delete all Tutorials
   // router.delete("/", tutorials.deleteAll);
 
   // Retrieve role from user
   router.get("/roles/:id", [authJwt.verifyToken], user.getRoles);

   app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
   });
   
   app.use('/api/user', router);
};
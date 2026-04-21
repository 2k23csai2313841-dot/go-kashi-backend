const express = require("express");
const startRouter = express.Router();

startRouter.get("/",(req,res,next)=>{
  res.send("server is running");
})
startRouter.get("/KashiRoute/check",(req, res, next) => {
    return res.json({ wakeup: true });

});

module.exports = startRouter;

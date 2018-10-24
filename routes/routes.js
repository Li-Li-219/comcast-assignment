const fs = require("fs");
// var obj = JSON.parse(fs.readFileSync("./file.js", "utf8"));

const appRouter = function(app) {
  app.get('/',(req,res)=>{
    res.send("hello world")
  });

  app.get("/api/:website/:destination/:startDate/:endDate", function(req, res) {
    const { website, destination, startDate, endDate } = req.params;
    let obj = [];
    if (destination){
      destination.replace(/[%20]/g,' ');
      console.log(destination);
    }
    console.log(startDate);
    console.log(endDate);
    if (website === "www.hotels.com") {
      obj = JSON.parse(fs.readFileSync("./urls/hotelsData.json", "utf8"));
      obj = obj.filter(el => {
        return (
          el.destination === destination &&
          el.CheckIn === startDate &&
          el.Checkout === endDate
        );
      });
    } else if (website ==="www.expedia.com") {
      console.log("wwww.expida.com");
      obj = JSON.parse(fs.readFileSync("./htmls/expediaData.json", "utf8"));
      console.log(obj);
      obj = obj.filter(el => {
        return (
          el.destination === destination &&
          el.CheckIn === startDate &&
          el.Checkout === endDate
        );
      });
      console.log(obj);
    }
    if (obj.length){
      res.status(200).send(obj);
    } else {
      res.status(200).send("Opps! It seems No Match Results, please search again!");
    }
  });
};

module.exports = appRouter;

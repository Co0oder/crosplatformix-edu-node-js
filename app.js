const express = require("express");
const app = express();
const hbs = require("hbs");
const fs = require('fs');

var id;

let rawdata = fs.readFileSync("DB.json");
let data = JSON.parse(rawdata);
statti = Object.values(data)

app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static('public'));

hbs.registerHelper('ifEq', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.inverse(this) : options.fn(this);
});

hbs.registerHelper('enc', function(arg1,options) {
  return encodeURI(arg1);
});

app.get("/",function (request, response){
response.render("lists.hbs",{ temp: statti,});
});
var obj_arr = [];
app.get("/page/:id",function (request, response) {
  id = request.params.id;
  try{
    obj_arr = Object.values(statti[id-1].content);
    response.render("main.hbs",{
    data : obj_arr
  }); 
  }
  catch{
    let num = Math.ceil(Math.random()*3)
    let img = `/img/dog_${num}.png`;
    response.render("404.hbs",{
      img : img
    });  
  }
});

app.get("/api",function (request, response){
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.json(data);
});

app.get("*",function (request, response){
  let num = Math.ceil(Math.random()*3)
  let img = `/img/dog_${num}.png`;
  response.render("404.hbs",{
    img : img
  });  
});





require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log(add);
  app.listen(process.env.PORT || 3000, add || 'localhost',function() {
    console.log('Application worker ' + process.pid + ' started...');
  });
});
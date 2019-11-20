var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require("body-parser");

var wizards = [
  {
    title: "First Pic",
    image:
      "https://vignette.wikia.nocookie.net/harrypotter/images/4/41/Hermionedhface.jpg/revision/latest/scale-to-width-down/350?cb=20161221044857"
  },
  {
    title: "Early Life",
    image:
      "https://vignette.wikia.nocookie.net/harrypotter/images/4/47/Granger_family_DH.jpg/revision/latest/scale-to-width-down/240?cb=20160712202711"
  },
  {
    title: "First Pic",
    image:
      "https://vignette.wikia.nocookie.net/harrypotter/images/4/41/Hermionedhface.jpg/revision/latest/scale-to-width-down/350?cb=20161221044857"
  },
  {
    title: "Early Life",
    image:
      "https://vignette.wikia.nocookie.net/harrypotter/images/4/47/Granger_family_DH.jpg/revision/latest/scale-to-width-down/240?cb=20160712202711"
  },
  {
    title: "First Pic",
    image:
      "https://vignette.wikia.nocookie.net/harrypotter/images/4/41/Hermionedhface.jpg/revision/latest/scale-to-width-down/350?cb=20161221044857"
  },
  {
    title: "Early Life",
    image:
      "https://vignette.wikia.nocookie.net/harrypotter/images/4/47/Granger_family_DH.jpg/revision/latest/scale-to-width-down/240?cb=20160712202711"
  }

];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/wizards", (req, res) => {
  res.render("wizards", { wizards: wizards });
});

app.post("/wizards",(req,res)=>{
    
    var newPost = {
        title: req.body.title,
        image: req.body.image
    };
    wizards.push(newPost);
    res.redirect("/wizards");
})

app.get('/wizards/new',(req,res)=>{
    res.render("new.ejs");
})
app.listen(port, () => {
  console.log("SocialWizard is started on server: " + port);
});

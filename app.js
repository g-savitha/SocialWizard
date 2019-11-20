var express = require("express"),
      app = express(),
      port = process.env.PORT || 3000,
      bodyParser = require("body-parser"),
      mongoose = require("mongoose");
        
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

//connect to db
mongoose.connect("mongodb://localhost:27017/social_wizard", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//schema setup
var wizardSchema = new mongoose.Schema({
  title: String,
  image: String,
  description:  String
});
//Model
var Wizard = mongoose.model("Wizard", wizardSchema);

app.get("/", (req, res) => {
  res.render("landing");
});

//INDEX Route - displays all posts
app.get("/wizards", (req, res) => {
  //get all wizards from db
  Wizard.find({},(err,allWizards)=>{
    if(err) console.log(err);
    else{
      res.render("index", { wizards: allWizards });
    }
    })
  
});

//CREATE Route - adds a new post to db
app.post("/wizards",(req,res)=>{
    
    var newPost = {
        title: req.body.title,
        image: req.body.image,
        description : req.body.description
    };
    Wizard.create(newPost,(err,newWizard)=>{
      if(err) console.log(err)
      else{
        res.redirect("/wizards");
      }   
  })   
})
//NEW -  shows form to create a new post
app.get('/wizards/new',(req,res)=>{
    res.render("new.ejs");
});
//SHOW - shows more info about one post
app.get('/wizards/:id',(req,res)=>{
  //find the post with a particulart ID
  Wizard.findById(req.params.id,(err,foundPost)=>{
    if(err) console.log(err);
    else{
      //render show template with that particular post
      res.render("show", {wizard:foundPost});
    }
   })

})
app.listen(port, () => {
  console.log("SocialWizard is started on server: " + port);
});

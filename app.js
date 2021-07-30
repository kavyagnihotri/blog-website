const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam maecenas ultricies mi eget mauris pharetra et ultrices neque. Eleifend quam adipiscing vitae proin sagittis nisl. Tristique risus nec feugiat in fermentum posuere urna. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Risus feugiat in ante metus dictum at. Tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius. Nibh mauris cursus mattis molestie a. Arcu odio ut sem nulla pharetra diam. Malesuada fames ac turpis egestas maecenas pharetra. Sed pulvinar proin gravida hendrerit lectus. Consequat nisl vel pretium lectus quam id leo in. Sed risus pretium quam vulputate dignissim suspendisse. Porttitor eget dolor morbi non arcu risus quis varius quam. Dignissim cras tincidunt lobortis feugiat vivamus at augue. Tellus in metus vulputate eu. Elit ullamcorper dignissim cras tincidunt lobortis feugiat. In fermentum posuere urna nec tincidunt. Dui accumsan sit amet nulla. At auctor urna nunc id cursus metus aliquam eleifend.";
const aboutContent = "Feugiat in fermentum posuere urna nec tincidunt praesent semper. Cras tincidunt lobortis feugiat vivamus at augue. Porta non pulvinar neque laoreet suspendisse. Faucibus turpis in eu mi bibendum neque. Nibh praesent tristique magna sit amet purus gravida quis blandit. Sit amet aliquam id diam maecenas ultricies mi eget. Est lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. In hac habitasse platea dictumst vestibulum rhoncus. In egestas erat imperdiet sed euismod nisi porta lorem mollis. Morbi blandit cursus risus at ultrices. Commodo ullamcorper a lacus vestibulum sed arcu non odio. Nibh nisl condimentum id venenatis a condimentum.";
const contactContent = "Donec adipiscing tristique risus nec feugiat in fermentum. At in tellus integer feugiat scelerisque varius morbi enim nunc. Ultrices in iaculis nunc sed augue lacus. Cursus in hac habitasse platea dictumst quisque sagittis purus. Varius quam quisque id diam vel quam elementum pulvinar. Est sit amet facilisis magna etiam tempor. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Quam pellentesque nec nam aliquam sem et tortor consequat. Lorem mollis aliquam ut porttitor leo a diam sollicitudin. At ultrices mi tempus imperdiet nulla malesuada pellentesque elit. Vitae nunc sed velit dignissim sodales ut eu. Tristique sollicitudin nibh sit amet commodo nulla facilisi. Purus sit amet luctus venenatis lectus. Ac placerat vestibulum lectus mauris ultrices. Auctor urna nunc id cursus. Sed pulvinar proin gravida hendrerit lectus.";
let posts = [];

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// HOME PAGE
app.get("/", function(req, res) {
  res.render("home", {homeStartingContent: homeStartingContent, posts: posts});
});

// ABOUT PAGE
app.get("/about", function(req, res) {
  res.render("about", {aboutContent: aboutContent});
});

// CONTACT PAGE
app.get("/contact", function(req, res) {
  res.render("contact", {contactContent: contactContent});
});

// COMPOSE PAGE
app.get("/compose", function(req, res) {
  res.render("compose");
});

// POSTS to Home page
app.post("/compose", function(req,res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody 
  };
  posts.push(post);
  res.redirect("/")
});

// individual posts
app.get("/posts/:abc", function(req, res) {

  posts.forEach(function(post) {
    if (_.lowerCase(req.params.abc) === _.lowerCase(post.title)) {
      res.render("post", {title: post.title, content: post.content});
    }
  });
});






app.listen(3000, function() {
    console.log("Server started on port 3000");
});
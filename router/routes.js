const express = require('express');
const routManager = express.Router();
const passport = require('passport');

const Newwayuser = require('../model/users.js')

//create passport local strategy
passport.use(Newwayuser.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Newwayuser.findById(id, (err, user) => {
    done(err, user);
  });
});

routManager.post("/register", async (req, res) => {
  try {
    const registerUser = await Newwayuser.register(Newwayuser({ email: req.body.email, username: req.body.username, password: req.body.password }), req.body.password);
    if (registerUser) {
      passport.authenticate("local")(req, res, function () {
        res.status(201).json({ message: "user saved successfully" })
      });
    } else {
      res.status(403).json({message: "db not "})
    }
  } catch (err) {
    res.send(err);
  }
});

//user login
routManager.post("/login", (req, res) => {
  const user = new Newwayuser({
    emai: req.body.email,
    password: req.body.passport
  })

  req.login(user, (err) => {
    if (err) {
      console.log(err)
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/")
      })
    }
  })
})


// routManager.get('/logout', (req, res) =>{
//   req.logout();
//   res.redirect('/');
// });

module.exports = routManager;
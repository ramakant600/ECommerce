//import {v4 as uuid } from "uuid";
//const {v4 : uuidv} = require('uuid')
//import User from '../models/userschema.js' ;

const User = require("../models/userschema");

let users = [];

const fname = "";
const lname = "";
const email = "";
const password = "";
exports.Getuser = (req, res) => {
  //let userId = req.params.Id ;
  //User.findById(userId)
  User.find()
    .then((users) => {
      console.log(users);

      let userdata = JSON.stringify(users);
      res.send(users);
    })
    .catch((err) => {
      res.send({ error: err });
      console.log(err);
    });
};

//  Find user by ID

exports.GetOneUser = (req, res) => {
  let userId = req.params._id;
  User.findById(userId)
    .then((user) => {
      console.log(user);

      let userdata = JSON.stringify(user);
      res.send(user);
    })
    .catch((err) => {
      res.send({ error: err });
      console.log(err);
    });
};

// controller code to create an user

const Createuser = (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const address1 = req.body.address1;
  // const address2 = req.body.address2;

  const user = new User({
    fname: fname,
    lname: lname,
    email: email,
    password: password,
    address1: address1,
  });
  // if (req.file !== undefined && req.file !== null) {
  //   user.image = req.file.filename;
  // }
  user
    .save()
    .then((result) => {
      //users.push({...user , id :uuid()})
      res.send({message:"user added successfully",user:result});
    })
    .catch((err) => {
      console.log(err);
    });
};

// code to update an user data

const updateUserData = (req, res) => {
  User.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

const Login = (req, res) => {
  const { email, password } = req.body;
  console.log("inside the controller +++++",req.body)
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        console.log("this is user++++",user)
        res.send({ message: "login sucess", user: user });
      } else {
        res.send({ message: "Invalid credentials" });
      }
    } else {
      res.send("email Not register Please Signup FIrst");
    }
  });
};

const adminLogin = (req, res) => {
  
  const { email, password } = req.body;
  console.log("inside the controller +++++")
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      console.log(user)
      console.log(req.body);
      if (password === user.password  && user.isAdmin) {
        res.send({ message: "login sucess", user: user });
      } else {
        res.send({ message: "Invalid credentials" });
      }
    } else {
      res.send("email Not register Please Signup FIrst");
    }
  });
};

const Register = (req, res) => {

  console.log(req.body);
  const { fname, lname, email, password } = req.body;
  console.log("reached at controller");
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "user already exist",user:user });
    } else {
      const user = new User({ fname, lname, email, password });
      user.save((err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "sucessfull", user: user });
        }
      });
    }
  });
};

//module.exports.Getuser = Getuser;
module.exports.updateUserData = updateUserData;
// module.exports.Createuser = Createuser;
module.exports.Login = Login;
module.exports.Register = Createuser;
module.exports.adminLogin = adminLogin;

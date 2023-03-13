const express = require("express");
const multer = require("multer");
const path = require("path");
const {v4 :uuidv4 } = require("uuid");
const router = express.Router();
const {
  Getuser,
  Createuser,
  GetOneUser,
  updateUserData,
  Login,
  Register,
  adminLogin,
} = require("../controllers/userController.js");
const { LoginAuth } = require("../middlewares/loginAuth.js");
const { validateUser } = require("../middlewares/userValidator.js");

var uniqueId = uuidv4();

const storage = multer.diskStorage({
    destination:function(req, file ,cb){
        console.log("from router ++++++++======="+ file.originalname)
        cb(null,path.join(__dirname,"../../client/quasar-project/src/assets/Uploads"));
    },
    filename:function(req,file,cb){
        cb(null,uniqueId+file.originalname);
    },
});
const fileFilter = (req,file,cb)=>{
    if(file.mimetype ==="image/jpg" || file.mimetype ==="image/jpeg"|| file.mimetype ==="image/png"){
        cb(null,true);
        
    }else{
        cb(null,false);
    }
};

const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024*1024*5,
    },
    fileFilter: fileFilter,
});

router.post("/Login",Login);
router.post("/adminLogin" ,adminLogin);
router.post("/Register",upload.single("image") ,Register); 

module.exports = router;

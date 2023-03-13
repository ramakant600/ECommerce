const express = require('express');
const multer = require("multer");
const path = require("path");
const {v4 :uuidv4 } = require("uuid");
const { CreateOrder, GetOneOrder, cancelOrder, GetOrder,searchbyDate} = require('../controllers/orderController.js');

const {CreateProduct , updateProductData , GetProduct, deleteOneProduct, searchProduct,getProductInRange, GetadminProduct, deleteProduct} = require("../controllers/productController.js");
const {Getuser , Createuser,GetOneUser , updateUserData, Login, Register} = require("../controllers/userController.js");

// const {addTodo , getTodos ,updateTodo, getTodosForSearch, updatemultiplebyid, getTodosforpagination, getTodosforexport, getDateRangeToDo } = require("../controllers/todoControlller.js");

const router = express.Router();
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


 router.post("/addProduct",upload.single("productImage"), CreateProduct);
 router.post("/editProduct",upload.single("productImage"), updateProductData);
 router.post("/deleteProduct", deleteProduct);
 router.get("/getProduct", GetProduct);
 
router.post("/getadminProduct",GetadminProduct)
router.post("/search",searchProduct)
router.post("/searchbydate",getProductInRange)

router.post("/createOrders",CreateOrder)
router.get("/getSingleOrders",GetOneOrder)
router.post("/deleteOrders",cancelOrder)
router.post("/order/searchbydate",searchbyDate)
router.post("/Orders",GetOrder)

// router.post("/addtodo",upload.single("image") ,addTodo);
//router.post("/addtodo" ,addTodo);


// router.get("/todos/:skip", getTodosforpagination);

// router.get("/gettodos/:userId", getTodosforexport);

// router.post("/searchtodos/search", getTodosForSearch);

// router.post("/searchDateRange", getDateRangeToDo);

// router.patch("/updatetodo/:_id",upload.single("image"), updateTodo);

// router.patch("/:_id", updatemultiplebyid);




// router.post("/Login",Login);

// router.post("/Register",Register);

module.exports = router ;
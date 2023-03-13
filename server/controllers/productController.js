const Product = require("../models/product.js");

let products = [];


const productName = "";
const productDescription = "";
const productCategory = "";
const productPrice = "";
const productImage = "";
const productSeller = "";
const productRating = "";

const GetProduct = (req, res) => {
  Product.find({Deleted:false})
    .then((products) => {
      console.log(products);

     // let productdata = JSON.stringify(products);
      res.send(products);
    })
    .catch((err) => {
      res.send({ error: err });
      console.log(err);
    });
};
const GetadminProduct = (req, res) => {
  Product.find({Deleted:false,adminId:req.body.adminId})
    .then((products) => {
      console.log(products);

     // let productdata = JSON.stringify(products);
      res.send(products);
    })
    .catch((err) => {
      res.send({ error: err });
      console.log(err);
    });
};
//delete product 

exports.deleteOneProduct = (req, res) => {
  let productId = req.params._id;
  Product.deleteOne({_id:productId})
    .then((product) => {
      res.send("Deleted");
    })
    .catch((err) => {
      res.send({ error: err });
    });
};
//  Find product by ID

exports.GetOneProduct = (req, res) => {
  let productId = req.params._id;
  Product.findById(productId)
    .then((product) => {
      console.log("---",product);

      let ProductData = JSON.stringify(product);
      res.send(product);
    })
    .catch((err) => {
      res.send({ error: err });
      console.log(err);
    });
};

// controller code to create an Product

const CreateProduct = (req, res) => {
 
  const productName = req.body.productName;
const productDescription = req.body.productDescription;
const productCategory = req.body.productCategory;
const productPrice = req.body.productPrice;
const productImage = req.body.productImage;
const productRating = req.body.productRating;
const adminId = req.body.adminId;
  const product = new Product({
 productName :productName,
 productDescription : productDescription,
 productCategory : productCategory,
 productPrice : productPrice,
 productSeller : productSeller,
 productRating : productRating,
 adminId:req.body.adminId,
 Deleted:false
  });
  console.log("thi++++",req.body)
  if(req.file !== undefined && req.file !== null){
    product.productImage = req.file.filename;
  }
  product
    .save()
    .then((result) => {
      
      res.send("Product added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

// code to update an product data

const updateProductData = (req, res) => {
  console.log("entered in the update API++++++",req.file)
  const updatedData = {
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productCategory: req.body.productCategory,
    productPrice: req.body.productPrice,
  };
  if(req.file !== undefined && req.file !== null){
    updatedData.productImage = req.file.filename;
 }
  Product.findByIdAndUpdate(req.body._id,updatedData)
    .then((product) => {
      if (!product) {
        console.log("dfgdfgf++++",product)
        return res.status(404).send();
      }
      console.log("dfgdfgf++++",product)
      res.send(product);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};
const deleteProduct = (req, res) => {
  console.log("entered in the update API++++++",req.file)
  if(req.file !== undefined && req.file !== null){
    updatedData.productImage = req.file.filename;
 }
  Product.findByIdAndUpdate(req.body._id,req.body)
    .then((product) => {
      if (!product) {
        console.log("dfgdfgf++++",product)
        return res.status(404).send();
      }
      console.log("dfgdfgf++++",product)
      res.send(product);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

const searchProduct = (req,res)=>{
  let search = req.body.value;
  console.log("inside th search controller",req.body)
  if (search === null || (search === undefined && search === "")) {
    res.send({ message: "item not found" });
  } else {
    Product
      .find({Deleted:false,
                $or: [
                    { productName: { $regex: ".*" + search.toLowerCase() + ".*" } },
                    { productDescription: { $regex: ".*" + search.toLowerCase() + ".*" } },
                    { productName: { $regex: ".*" + search.toLowerCase() + ".*" } },
                  ]
            
       })
      .then((products) => {
        console.log(products);
        res.send(products);
      })
      .catch((err) => {
        res.send({ error: err });
        console.log(err);
      });
  }
};

getProductInRange = (req, res) => {

  let DateFrom = req.body.startdate;
  let DateTo = req.body.end;
  console.log(" search inside the todo controller " + JSON.stringify(req.body)); 
    Product
      .find({Deleted:false,
            userId:userId,
                $or: [
                  {dateAdded: {
                      $gte: DateFrom,
                      $lte: DateTo
                  }}
                  ],
       })
      .then((product) => {
        console.log(product);
        res.send(product);
      })
      .catch((err) => {
        res.send({ error: err });
        console.log(err);
      });
  
};

module.exports.updateProductData = updateProductData;
module.exports.deleteProduct = deleteProduct;
module.exports.CreateProduct = CreateProduct;
module.exports.GetProduct = GetProduct;
module.exports.GetadminProduct = GetadminProduct;
module.exports.searchProduct = searchProduct;
module.exports.getProductInRange = getProductInRange;


  
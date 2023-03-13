const Order = require("../models/orderDetails.js");

let products = [];



const GetOrder = (req, res) => {
  console.log("req . body=",req.body);
    Order.find({cancelled:false,userId:req.body._id})
    .then((orders) => {
      console.log("this is order-",orders);

     // let productdata = JSON.stringify(products);
      res.send(orders);
    })
    .catch((err) => {
      res.send({ error: err });
      console.log(err);
    });
};
//delete order 
const cancelOrder = (req, res) => {
  console.log("delete order ",req.body);
  let orderId = req.body._id;
  Order.findByIdAndUpdate(req.body._id,req.body)
    .then((orders) => {
      res.send("Deleted");
      console.log(orders);
    })
    .catch((err) => {
      res.send({ error: err });
    });
};
//  Find product by ID

const GetOneOrder = (req, res) => {
  let productId = req.params._id;
  Order.findById(productId)
    .then((orders) => {
      console.log("---",orders);

      let ProductData = JSON.stringify(orders);
      res.send(orders);
    })
    .catch((err) => {
      res.send({ error: err });
      console.log(err);
    });
};

// controller code to create an Product

const CreateOrder = (req, res) => {
 
//   const productName = req.body.productName;
// const productDescription = req.body.productDescription;
// const productCategory = req.body.productCategory;
// const productPrice = req.body.productPrice;
// const productImage = req.body.productImage;
// const productSeller = req.body.productSeller;
// const productRating = req.body.productRating;
console.log("++++++++++++++++++",req.body)
  const order = new Order({
    userId :req.body.userId,
    ProductId:req.body.productId,
    quantity:req.body.quantity,
    status:req.body.status,
    orderDateTime:req.body.orderDateTime,
    cancelled:req.body.cancelled
  });
  order
    .save()
    .then((result) => {
      
      res.send("Ordered successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

// code to update an product data

// const searchProduct = (req,res)=>{
//   let search = req.body.value;
//   if (search === null || (search === undefined && search === "")) {
//     res.send({ message: "item not found" });
//   } else {
//     console.log(req.body.value);
//     Product
//       .find({
//                 $or: [
//                     { productName: { $regex: ".*" + search + ".*" } },
//                     { productDescription: { $regex: ".*" + search + ".*" } },
//                     { productCategory: { $regex: ".*" + search + ".*" } },
//                   ]
            
//        })
//       .then((products) => {
//         console.log(products);
//         res.send(products);
//       })
//       .catch((err) => {
//         res.send({ error: err });
//         console.log(err);
//       });
//   }
// };
searchbyDate = (req, res) => {

  let DateFrom = req.body.startDate;
  let DateTo = req.body.endDate;
  console.log(" search inside the todo controller " + JSON.stringify(req.body)); 
  Order
      .find({userId:req.body.id,$or: [
                  {orderDateTime: {
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


module.exports.CreateOrder = CreateOrder;
module.exports.GetOneOrder = GetOneOrder;
module.exports.cancelOrder = cancelOrder;
module.exports.GetOrder = GetOrder;
module.exports.searchbyDate = searchbyDate;

  
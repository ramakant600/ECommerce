<template>
  <div style="display: block">
    <!-- <q-header elevated> -->
    <q-toolbar class="bg-blue text-white shadow-2 rounded-borders">
      <q-avatar @click="showProfileFunction()">
        <img
          src="../assets/Uploads/56a9d99f-01bb-49e1-809d-bcb82ae50e90Banana-Single.jpg"
        />
      </q-avatar>
      <q-toolbar-title>Welcome</q-toolbar-title>

      <q-btn
        style="float: left; margin-right: 5vw"
        color="primary"
        label="+Add Product"
        @click="openAddProduct"
      />
      <q-btn
        style="float: left; margin-right: 5vw"
        color="primary"
        label="+Add New Category"
        @click="openAddCategory"
      />
      <q-input v-model="searchQuery" placeholder="Search..." />
      <q-btn
        color="primary"
        label="search"
        @click="searchProduct()"
        class="q-mx-sm"
      />
      <!-- <q-btn
        icon="shopping_cart"
        :label="`${cartProducts.length}`"
        @click="goTOCart()"
      /> -->
    </q-toolbar>
    <!-- </q-header> -->
    <div style="margin-bottom: 2px">
      <q-dialog v-model="addCategoryOpened" style="width: 50vw" bar>
        <q-card>
          <q-form style="width: 30vw">
            <q-input
              id="productName"
              v-model="NewCategory"
              standout
              label="Enter New Category"
            />
            <q-input
              type="submit"
              @click="categorySubmithandler"
              v-close-popup
            />
          </q-form>
        </q-card>
      </q-dialog>
    </div>
    <div>
      <q-dialog v-model="addProductOpened" style="width: 50vw" bar>
        <q-card>
          <q-form
            style="width: 30vw"
            @submit="Submithandler()"
            enctype="multipart/form-data"
          >
            <q-input
              id="productName"
              v-model="productName"
              standout
              label="Enter Product Name"
            />
            <q-input
              id="productDescription"
              v-model="productDescription"
              standout
              label="Enter Product Description"
            />
            <q-select
              id="productCategory"
              v-model="ProductCategory"
              standout
              :options="categories"
              label="Product Category"
            />
            <q-input
              id="productPrice"
              v-model="productPrice"
              standout
              label="Enter Product Price"
            />
            <q-input
              standout
              id="productSeller"
              v-model="ProductSeller"
              type="text"
              label="Enter Product Seller Name"
            ></q-input>
            <q-input
              id="productImage"
              v-model="productImage"
              type="file"
            ></q-input>
            <q-input type="submit" v-close-popup />
          </q-form>
        </q-card>
      </q-dialog>
    </div>
    <div style="">
      <v-list
        style="

          max-width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: left;
          margin-left: 3%;
        "
      >
        <v-list-item
          v-for="openedProduct in Products"
          :key="openedProduct.id"
          style="border-radius: 5px; margin: 20px 5px 0 5px; max-width: 100%"
        >
          <q-card class="my-card" style="width: 18vw; height: 50vh">
            <q-img
              :src="`../assets/Uploads/${openedProduct.productImage}`"
              style="width: 18vw; height: 25vh"
            />

            <q-card-section>
              <div class="row no-wrap items-center">
                <div
                  class="col text-h6 ellipsis"
                  style="text-overflow: ellipsis"
                >
                  {{ openedProduct.productName }}
                </div>
                <div>
                  <q-rating v-model="stars" :max="5" size="18px" />
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <!-- <div class="text-subtitle1">
              {{ openedProduct.productCategory }}
            </div> -->
              <div class="text-caption text-grey">
                {{ openedProduct.productDescription }}
              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions align="right">
              <span style="width: 30%; margin-right: 30%"
                >$ {{ openedProduct.productPrice }}</span
              >
              <q-btn
                v-close-popup
                flat
                color="primary"
                icon="edit"
                @click="editProductDialog(openedProduct)"
              />
              <q-btn
                v-close-popup
                flat
                color="primary"
                round
                icon="delete"
                @click="deleteProduct(openedProduct)"
              />
            </q-card-actions>
          </q-card>
        </v-list-item>
      </v-list>
    </div>
    <!-- logoutpopup++++++========================================================================================================== -->
    <div>
      <q-dialog v-model="showProfile">
        <q-card style="width: 30vw">
          <q-avatar style="margin: 2vh 0 0 43%">
            <img
              src="../assets/Uploads/56a9d99f-01bb-49e1-809d-bcb82ae50e90Banana-Single.jpg"
            />
          </q-avatar>
          <h6 style="text-align: center">Welcome</h6>

          <q-btn style="margin: 2vh 0 0 40%" icon="logout" @click="Logout"
            >Logout</q-btn
          >
        </q-card>
      </q-dialog>
    </div>
      
  </div>
</template>

<script>
import axios from "axios";
// import router from "router/routes.vue"
export default {
  name: "DashboardComponent",
  data() {
    return {
      searchQuery: "",
      addProductOpened: false,
      productName: "",
      productDescription: "",
      ProductCategory: "",
      productPrice: "",
      ProductSeller: "",
      productImage: "",
      categories: [],
      selected: [],
      Products: [],
      openedProduct: {},
      ViewProductcard: false,
      stars: 3,
      // imagURL: "../assets/Uploads/",
      currentProductId: "",
      addCategoryOpened: false,
      NewCategory: "",
      user: "",
      showProfile: false,
    };
  },
  // props: {
  //   adminId: String,
  // },
  methods: {
    openAddProduct() {
      this.addProductOpened = true;
    },
    showProfileFunction() {
      this.showProfile = true;
    },
    categorySubmithandler() {
      //  this.addCategoryOpened=false,
      if (this.categories != null) {
        this.categories[this.categories.length] = this.NewCategory;
        console.log(this.categories);
        let cat = [];
        for (var i = 0; i < this.categories.length; i++) {
          cat[i] = this.categories[i];
        }
        let NewCategoryString = JSON.stringify(cat);
        localStorage.setItem("categories", NewCategoryString);
        this.addCategoryOpened = false;
        this.NewCategory=""
      } else {
        this.categories = [];
        let newcat = this.NewCategory;
        this.categories[0] = newcat;
        console.log(this.categories);

        let NewCategoryString = JSON.stringify(this.categories);
        localStorage.setItem("categories", NewCategoryString);
        this.NewCategory=""
        this.addCategoryOpened = false;
      }
    },
    openAddCategory() {
      this.addCategoryOpened = true;
    },
    Logout() {
      localStorage.removeItem("userData");
      this.$router.push("admin/login");
    },
    searchProduct() {
      //  var searchValue =this.searchQuery;
      var searchValue = {
        value: this.searchQuery,
      };
      axios
        .post("http://localhost:5000/search", searchValue)
        .then((res) => {
          console.log("this is response", res);
          this.Products = res.data;
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },
    deleteProduct(product) {
      var id = product._id;
      var productdeletedata = {
        _id: product._id,
        Deleted: true,
      };
      axios
        .post("http://localhost:5000/deleteProduct", productdeletedata)
        .then((response) => {
          console.log(response);
          this.getProducts();
          if (response.data.message === "") {
            console.log(response.data);
            // this.router.push('/')
            //   navigate("/Dashboard",{state:response.data.user});
          } else {
            alert(response.data.message);
          }
        })
        .catch((err, response) => {
          console.log("error inside catch-" + err);
        });
    },
    // ViewProduct(product) {
    //   this.openedProduct._id = Reflect.get(product, "_id");
    //   this.openedProduct.productName = Reflect.get(product, "productName");
    //   this.openedProduct.productDescription = Reflect.get(
    //     product,
    //     "productDescription"
    //   );
    //   this.openedProduct.productCategory = Reflect.get(
    //     product,
    //     "productCategory"
    //   );
    //   this.openedProduct.productSeller = Reflect.get(product, "productSeller");
    //   this.openedProduct.productPrice = Reflect.get(product, "productSeller");
    //   console.log(this.openedProduct._id);
    //   this.ViewProductcard = true;
    // },
    Submithandler() {
      if (this.currentProductId) {
        this.callEditApi(this.openedProduct);
      } else {
        console.log("focused");
        this.addProductOpened = false;
        console.log(this.productImage);
        const formData = new FormData();
        formData.append("productName", this.productName);
        formData.append("productDescription", this.productDescription);
        formData.append("productCategory", this.ProductCategory);
        formData.append("productSeller", this.ProductSeller);
        formData.append("productPrice", this.productPrice);
        formData.append("productRating", this.productRating);
        formData.append("Deleted", false);
        formData.append("productImage", this.productImage[0]);
        //  const productData = {
        //    productName: this.productName,
        //    productDescription: this.productDescription,
        //    productCategory: this.ProductCategory,
        //    productSeller: this.ProductSeller,
        //    productImage: this.ProductImage,
        //    productPrice: this.productPrice,
        //    productRating:this.stars,
        //    Deleted:false,
        //  };
        console.log(formData);
        this.productName = "";
        this.productDescription = "";
        this.ProductCategory = "";
        this.ProductSeller = "";
        this.ProductImage = "";
        this.productPrice = "";
        this.stars = 3;
        axios
          .post("http://localhost:5000/addProduct", formData)
          .then((response) => {
            console.log(response);
            this.getProducts();
            if (response.data.message === " sucess") {
              console.log(response.data);
              // this.router.push('/')
              //   navigate("/Dashboard",{state:response.data.user});
            } else {
              //alert(response.data.message);
              let data = [true, response.data.user];
            }
          })
          .catch((err, response) => {
            console.log("error inside catch-" + err);
          });
      }
    },
    getProducts() {
      axios.get("http://localhost:5000/getProduct").then((res) => {
        console.log("this is response", res);
        this.Products = res.data;
        this.categories = localStorage.getItem("categories");
        this.categories = JSON.parse(this.categories);
        this.user = localStorage.getItem("user");
        this.user = JSON.parse(this.user);
      });
    },
    editProductDialog(product) {
      this.currentProductId = product._id;
      this.productName = product.productName;
      this.productDescription = product.productDescription;
      this.ProductCategory = product.productCategory;
      this.ProductSeller = product.productSeller;
      this.ProductImage = product.productImage;
      this.productPrice = product.productPrice;
      console.log("hsdfjsf", this.currentProductId);
      this.addProductOpened = true;
      // this.callEditApi(product);
    },
    callEditApi(product) {
      console.log("inside edit API", product);
      const productData = {
        _id: this.currentProductId,
        productName: this.productName,
        productDescription: this.productDescription,
        productCategory: this.ProductCategory,
        productSeller: this.ProductSeller,
        productImage: this.ProductImage,
        productPrice: this.productPrice,
        Deleted: false,
      };
      console.log(productData);
      axios
        .post("http://localhost:5000/editProduct", productData)
        .then((response) => {
          console.log(response);
          this.getProducts();
          if (response.data.message === " sucess") {
            console.log(response.data);
            // this.router.push('/')
            //   navigate("/Dashboard",{state:response.data.user});
          } else {
            //alert(response.data.message);
          }
        })
        .catch((err, response) => {
          console.log("error inside catch-" + err);
        });
      this.productName = "";
      this.productDescription = "";
      this.ProductCategory = "";
      this.ProductSeller = "";
      this.ProductImage = "";
      this.productPrice = "";
    },
  },
  beforeMount() {
    this.getProducts();
  },
};
</script>
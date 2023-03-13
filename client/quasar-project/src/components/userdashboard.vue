<template>
  <div style="display: block">
    <!-- <q-header > -->
    <q-toolbar class="bg-red text-white shadow-2 rounded-borders" style="z-index: 9999999;">
      <!-- <q-avatar @click="showProfileFunction">
        <img
          src="../assets/Uploads/56a9d99f-01bb-49e1-809d-bcb82ae50e90Banana-Single.jpg"
        />
      </q-avatar> -->
      <!-- <q-toolbar-title>{{ user?user.fname:'welcome' }}</q-toolbar-title> -->
      <q-toolbar-title @click="goToHome()" style="margin-left: 0vw"
        >Home</q-toolbar-title
      >

      <q-toolbar-title @click="goTocategory()" style="margin-right: 45vw"
        >Category</q-toolbar-title
      >

      <q-toolbar-title
        @click="goToMyOrders()"
        class="q-my-sm"
        style="margin-left: -40%"
        >My Orders</q-toolbar-title
      >

      <q-btn
        v-if="isadmin"
        class="q-mx-sm"
        color="danger"
        label="+Add Product"
        @click="openAddProduct"
        size="md"
      />
      <q-btn
        v-if="isadmin"
        class="q-mx-sm"
        color="danger"
        label="+Add New Category"
        size="md"
        @click="openAddCategory"
      />
      <!-- <q-btn
          style="float: left; margin-right: 5vw"
          color="primary"
          label="+Add New Category"
          @click="openAddCategory"
        /> -->

      <q-input v-model="searchQuery" placeholder="Search..." @blur="searchProduct"/>
      <q-btn
        color="primary"
        label="search"
        @click="searchProduct()"
        class="q-mx-sm"
      />
      <q-btn
        v-if="cartProducts != undefined"
        icon="shopping_cart"
        :label="`${cartProducts.length}`"
        @click="goTOCart()"
      />
      <q-btn
        v-if="cartProducts == undefined"
        icon="shopping_cart"
        @click="goTOCart()"
      />
      <q-btn
        v-if="!isLogedin"
        label="Login"
        @click="goTologinPage"
        class="q-mx-sm"
      />
      <!-- <q-btn v-if="isLogedin" label="Login" @click="showProfileFunction" class="q-mx-sm" /> -->
      <q-avatar class="q-mx-sm" v-if="isLogedin" @click="showProfileFunction">
        <img src="../assets/user.png" />
      </q-avatar>
    </q-toolbar>
    <!-- </q-header> -->
    <div v-if="active == 'home' || active == 'products'">
      <v-list
        style="
          max-width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: left;
        "
      >
        <v-list-item
          v-for="openedProduct in Products"
          :key="openedProduct._id"
          style="border-radius: 5px; margin: 20px 5px 0 5px; max-width: 100%"
        >
          <!-- <q-dialog v-model="ViewProductcard" style="width: 25vw"> -->
          <q-card
            class="my-card"
            style="width: 18vw; height: 40vh; display: block"
          >
            <q-img
              src="https://cdn.quasar.dev/img/chicken-salad.jpg"
            
              style="width: 18vw; height: 20vh"
              @click="openProductDetails(openedProduct)"
            />

            <q-card-section>
              <div class="">
                <div
                  class="col text-h6 ellipsis"
                  style="text-overflow: ellipsis"
                  @click="openProductDetails(openedProduct)"
                >
                  {{ openedProduct.productName }}
                </div>
                <!-- <div>
                  <q-rating v-model="stars" :max="5" size="20px" />
                </div> -->
                <span style="float: left"
                  >$ {{ openedProduct.productPrice }}</span
                >
              </div>
            </q-card-section>

            <!-- <q-card-section class="q-pt-none"> -->
            <!-- <div class="text-subtitle1">
                      {{ openedProduct.productCategory }}
                    </div> -->
            <!-- <div class="text-caption text-grey ellipse">
                {{ openedProduct.productDescription }}
              </div> -->
            <!-- </q-card-section> -->
            <q-separator style="margin-top: 10px" />
            <q-card-actions style="width: 100%">
              <q-btn
                align="left"
                v-if="isadmin"
                v-close-popup
                flat
                color="primary"
                icon="edit"
                @click="editProductDialog(openedProduct)"
                style="width: 15%"
              />
              <q-btn
                align="left"
                v-if="isadmin"
                v-close-popup
                flat
                color="primary"
                round
                icon="delete"
                @click="deleteProduct(openedProduct)"
                style="width: 15%"
              />
              <q-btn
                align="right"
                v-close-popup
                flat
                color="primary"
                label="Add to Cart"
                @click="AddToCart(openedProduct)"
                style="margin: 2px 0 0 25px"
              />
            </q-card-actions>
          </q-card>
          <!-- </q-dialog> -->
        </v-list-item>
      </v-list>
    </div>
    <!-- Cart page ================================================================================================== -->
    <div v-if="active == 'cart'">
      <div style="margin: 1vw 0 0 90vw">
        <q-btn @click="checkOutPopup()" color="deep-orange" glossy
          >Checkout</q-btn
        >
      </div>
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
          v-for="openedProduct in cartProducts"
          :key="openedProduct._id"
          style="border-radius: 5px; margin: 20px 5px 0 5px; max-width: 100%"
        >
          <!-- <q-dialog v-model="ViewProductcard" style="width: 25vw"> -->
          <q-card class="my-card" style="width: 18vw; height: 37vh">
            <q-img
              src="https://cdn.quasar.dev/img/chicken-salad.jpg"
              style="width: 18vw; height: 20vh"
            />

            <q-card-section>
              <div class="">
                <div
                  class="col text-h6 ellipsis"
                  style="text-overflow: ellipsis"
                >
                  {{ openedProduct.productName }}
                </div>
                <!-- <div>
                  <q-rating v-model="stars" :max="5" size="20px" />
                </div> -->
              </div>
            </q-card-section>

            <!-- <q-card-section class="q-pt-none"> -->
            <!-- <div class="text-subtitle1">
                      {{ openedProduct.productCategory }}
                    </div> -->
            <!-- <div class="text-caption text-grey ellipse">
                {{ openedProduct.productDescription }}
              </div>
            </q-card-section> -->
            <q-separator />

            <q-card-actions align="left">
              <span style="width: 20%">$ {{ openedProduct.productPrice }}</span>
              <span class="text-weight-bold q-mx-sm"
                >Quantity : {{ openedProduct.quantity }}
              </span>
              <q-btn
                v-close-popup
                flat
                color="primary"
                label="Remove"
                @click="deleteToCart(openedProduct._id)"
                style="width: 30%"
              />
              <!-- <q-btn
                      v-close-popup
                      flat
                      color="primary"
                      label="Order"
                      @click="Addorder(openedProduct._id)"
                      class="q-mx-md"
                      style="width:30%"
                  /> -->
            </q-card-actions>
          </q-card>
          <!-- </q-dialog> -->
        </v-list-item>
      </v-list>
      <q-footer style="margin-top: -50%">
        <q-toolbar>
          <q-toolbar-title>@copyright by genesis technologies</q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </div>
    <!--My orders +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ++++++++++++++++++++++++++++-->
    <div v-if="active == 'order'">
      <!-- <q-btn @click="showsearchpopup">Search by order Date</q-btn> -->
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
          v-for="orderedProduct in MyOrders"
          :key="orderedProduct._id"
          style="border-radius: 5px; margin: 20px 5px 0 5px; max-width: 100%"
        >
          <!-- <q-dialog v-model="ViewProductcard" style="width: 25vw"> -->
          <q-card
            class="my-card"
            style="width: 18vw; height: 50vh; display: block"
          >
            <q-img
              src="https://cdn.quasar.dev/img/chicken-salad.jpg"
              style="width: 18vw; height: 25vh"
            />

            <q-card-section>
              <div class="">
                <div
                  class="col text-h6 ellipsis"
                  style="text-overflow: ellipsis"
                >
                  {{ orderedProduct.productName }}
                </div>
                <div>
                  <q-rating v-model="stars" :max="5" size="20px" />
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <!-- <div class="text-subtitle1">
                      {{ orderProduct.productCategory }}
                    </div> -->
              <div class="text-caption text-grey ellipse">
                {{ orderedProduct.productDescription }}
              </div>
            </q-card-section>
            <q-separator />

            <q-card-actions align="right">
              <span style="float: left; width: 40%"
                >$ {{ orderedProduct.productPrice }}</span
              >
              <q-btn
                v-close-popup
                flat
                color="primary"
                label="Cancel Order"
                @click="Cancelorder(orderedProduct._id)"
              />
            </q-card-actions>
          </q-card>
          <!-- </q-dialog> -->
        </v-list-item>
      </v-list>
      <q-footer>
        <q-toolbar>
          <q-toolbar-title>@copyright by genesis technologies</q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </div>
    <!-- <! checkout --============================================================================================================================= -->
    <div>
      <q-dialog v-model="paymentfailedPopup" >
        <q-card>
          <q-card-section>
            <div class="text-h6">Alert</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Payment Filed please try again.
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="showcheckout" persistent>
        <q-card style="width: 50vw">
          <q-toolbar>
            <q-toolbar-title
              ><span class="text-weight-bold">CheckOut</span>
            </q-toolbar-title>

            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>
          <q-separator />
          <div class="q-mx-md q-my-sm">
            <p class="text-weight-bold">Billing Address</p>
            <p>Delivery Address : {{newAddress?newAddress:user.address1 }}</p>
            <q-btn  @click="newAddresspopup">new Address</q-btn>
          </div>
          <q-separator inset />
          <div>
            <q-list>
              <q-list-item v-for="product in cartProducts" :key="product.id">
                <div>
                  <q-avatar square>
                    <img
                      src="https://cdn.quasar.dev/img/chicken-salad.jpg"
                    />
                  </q-avatar>
                  <span class="text-weight-bold"
                    >{{ product.productName }} - ${{ product.productPrice }} x{{
                      product.quantity
                    }}
                    = {{ product.productPrice * product.quantity }}
                  </span>
                </div>
              </q-list-item>
              <q-separator inset />
              <p class="text-weight-bold q-mx-md q-my-sm">Total Amount - ${{ totalPrice }}</p>
            </q-list>
          </div>
          <q-separator inset />
          <q-form class="q-my-sm">
            <q-field label="Card Number" class="q-mx-md">
              <q-input
                type="text"
                mask="#### #### #### ####"
                v-model="cardNumber"
              />
            </q-field>

            <q-field label="Card Type" class="q-mx-md">
              <q-select class="qq-my-xs q-mx-md" label="Card Type" standout clearable :options="cardOptions" v-model="cardtype" />
            </q-field>

            <q-btn
              label="Submit"
              @click="submitForm"
              style="margin-left: 40%"
              class="q-my-md"
            />
          </q-form>
        </q-card>
      </q-dialog>
    </div>
    <!-- say to login page =============================================================================================== -->
    <q-dialog v-model="loginPopoup" persistent>
      <q-card style="width: 40vw">
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <div>
          <h5 class="text-weight-bold" style="color: red; margin: 0 0 0 25%">
            Please login to proceed!
          </h5>
          <q-seperator />
          <q-img
            src="https://media.giphy.com/media/E5pz6sWcsCEmzy0JeA/giphy.gif"
            style="width: 10vw; height: 20vh; margin: 5% 0 5% 33%"
          ></q-img>
        </div>
      </q-card>
    </q-dialog>

    <!-- categories page++++++++++======================================================================================== -->
    <div style="height: 10vh; z-index:0">
      <div v-if="active == 'category'" style="height: 10vh;">
      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        style="position:absolute;margin-top:30%;z-index: -999999 !important;"
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list" v-for="category in categories" :key="category" >

            <q-item clickable v-ripple >
              <!-- <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section> -->

              <q-item-section @click="showCategory(category)" >
                {{category}}
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-page-container>
        <q-page class="q-mx-sm q-my-md" style="
          max-width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: left">
         <q-list v-for="(product,index) in selectedCategoryProduct" :key="index">
<q-card
            class="my-card q-mx-md"
            style="width: 18vw; height: 40vh; display: block"
          >
            <q-img
              src="https://cdn.quasar.dev/img/chicken-salad.jpg"
              style="width: 18vw; height: 20vh"
              @click="openProductDetails(product)"
            />

            <q-card-section>
              <div class="">
                <div
                  class="col text-h6 ellipsis"
                  style="text-overflow: ellipsis"
                  @click="openProductDetails(product)"
                >
                  {{ product.productName }}
                </div>
                <!-- <div>
                  <q-rating v-model="stars" :max="5" size="20px" />
                </div> -->
               
              </div>
            </q-card-section>

            <!-- <q-card-section class="q-pt-none"> -->
            <!-- <div class="text-subtitle1">
                      {{ openedProduct.productCategory }}
                    </div> -->
            <!-- <div class="text-caption text-grey ellipse">
                {{ openedProduct.productDescription }}
              </div> -->
            <!-- </q-card-section> -->
            <q-separator style="margin-top: 10px" />
            <q-card-actions style="width: 100%">
               <span style="float: left"
                  >$ {{ product.productPrice }}</span
                >
              <q-btn
                align="right"
                v-close-popup
                flat
                color="primary"
                label="Add to Cart"
                @click="AddToCart(product)"
                style="margin: 2px 0 0 25px"
              />
            </q-card-actions>
          </q-card>
         </q-list>
        </q-page>
      </q-page-container>
      </div>
      <q-footer>
        <q-toolbar>
          <q-toolbar-title>@copyright by genesis technologies</q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </div>
    <!-- logoutpopup++++++========================================================================================================== -->
    <div>
      <q-dialog v-model="showProfile">
        <q-card style="width: 30vw">
          <q-avatar style="margin: 2vh 0 0 43%">
            <img
              src="../assets/user.png"
            />
          </q-avatar>
          <h6 style="text-align: center">
            Welcome {{ user.fname }} 
          </h6>
          <p style="text-align:center">Address : {{user.address1}}</p>


          <q-btn style="margin:10px 0 10px 38%" icon="logout" @click="Logout"
            >Logout</q-btn
          >
        </q-card>
      </q-dialog>
    </div>
    <!-- search by date============================================================================================================= -->
    <div>
      <q-dialog v-model="showsearchDate">
        <q-card style="width: 40vw; height: 50vh">
          <q-form>
            
            <q-input v-model="startDate" type="date" style="margin: 10%" placeholder="select start date" hint="select start date"/>
        
            <q-input
              v-model="endDate"
              type="date"
              style="margin: 10%"
              hint="select end date"
            />
            <q-btn @click="searchByDate" style="margin-left: 40%"
              >Search</q-btn
            >
          </q-form>
        </q-card>
      </q-dialog>
    </div>
    <!-- Add new pruduct=============================================================================================================== -->
    <div>
      <q-dialog v-model="addProductOpened" style="width: 50vw" persistent>
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <h6 class="q-my-md q-ml-xl" style="margin-left: 35%">
            {{ addProductOpened ? "Add Product" : "Edit Product" }}
          </h6>
          <q-form
            style="width: 30vw"
            enctype="multipart/form-data"
            ref="addProductform"
          >
            <q-input
              id="productName"
              v-model="productName"
              standout
              label="Enter Product Name"
              class="q-my-xs q-mx-md"
              :rules="nameRules"
              ref="nameRef"
            />
            <!-- <q-input
              id="productDescription"
              v-model="productDescription"
              standout
              label="Enter Product Description"
            /> -->
            <q-input
              id="productDescription"
              v-model="productDescription"
              ref="descriptionRef"
              standout
              type="textarea"
              label="Enter Product Description"
              class="q-my-xs q-mx-md"
             :rule="descriptionRules"
            />
            <q-select
              id="productCategory"
              v-model="ProductCategory"
              standout
              ref="categoryRef"
              :options="categories"
              label="Product Category"
              class="qq-my-xs q-mx-md"
              :rules="categoryRules"
              clearable
            />
            <q-input
              id="productPrice"
              v-model="productPrice"
              standout
              ref="priceRef"
              label="Enter Product Price"
              class="q-my-xs q-mx-md"
              :rules="priceRules"
            />
            <!-- <q-input
              standout
              id="productSeller"
              v-model="ProductSeller"
              type="text"
              label="Enter Product Seller Name"
              class="q-my-xs q-mx-md"
              :rules="sellerRules"
            ></q-input> -->
            <q-input
              id="productImage"
              v-model="productImage"
              ref="imageRef"
              type="file"
              class="q-my-xs q-mx-md"
            ></q-input>
            <q-btn
              type="submit"
              label="Submit"
              @click="Submithandler()"
              class="q-my-sm"
              style="margin-left: 35%"
            />
          </q-form>
        </q-card>
      </q-dialog>
    </div>
    <!-- ============================================================================ -->
    <!-- product popup=================================================================================================== -->
    <q-dialog v-model="openproduct">
      <q-card style="width: 40vw; min-width: 200px; height: 80vh">
        <q-img
          src="https://cdn.quasar.dev/img/chicken-salad.jpg"
          style="width: 40vw; height: 40vh"
        />
        <q-card-section>
          <div class="">
            <div class="col text-h6 ellipsis" style="text-overflow: ellipsis">
              {{ selectedProduct.productName }}
            </div>
            <div>
              <q-rating v-model="stars" :max="5" size="20px" />
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            {{ selectedProduct.productCategory }}
          </div>
          <div class="text-caption text-grey ellipse">
            {{ selectedProduct.productDescription }}
          </div>
        </q-card-section>
        <q-separator />

        <q-card-actions align="right">
          <p style="float: left; width: 100%">
            Price : $ {{ selectedProduct.productPrice }}
          </p>
          <q-btn
            style="margin-right: 80%"
            color="primary"
            label="Add to cart"
            @click="AddToCart(selectedProduct)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- add category form================================================== -->
    <q-dialog v-model="addCategoryOpened" style="width: 50vw" >
      <q-card>
        <q-form style="width: 30vw" ref="categoryformref">
          <q-input
            id="productName"
            v-model="NewCategory"
            standout
            label="Enter New Category"
            :rules="categoriesrules"
          />
          <q-input type="submit" @click="categorySubmithandler"  />
        </q-form>
      </q-card>
    </q-dialog>
    <!-- new addreress============================================================= -->
    <q-dialog v-model="newAddressshow" persistent>
      <q-card style="width:30vw">
      <q-space/>
      <q-btn flat round dense icon="close" v-close-popup />
       
      <q-form ref="addressform">
         <q-input
              v-model="newAddress"
              standout
              type="textarea"
              label="Enter new address"
              class="q-my-md q-mx-md"
             :rule="descriptionRules"
            />
             <q-input type="submit" @click="addressSubmithandler" />
      </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { useQuasar } from "quasar";
import { stringify } from "postcss";
// import LoginForm from "./login.vue"

// import router from "router/routes.vue"
export default {
  name: "userDashboardComponent",
  // components:{LoginForm},
  data() {
    return {
      newAddress:"",
      newAddressshow:false,
      orders: [],
      orders2:"",
      openproduct: false,
      NewCategory: "",
      selectedProduct: "",
      searchQuery: "",
      addProductOpened: false,
      productName: "",
      nameRules: [
        (v) => /^[a-zA-Z0-9\s]{1,50}$/.test(v) || "please enter valid fname",
      ],
      descriptionRules: [
        (v) => /^[a-zA-Z0-9\s]{1,150}$/.test(v) || "please enter valid description",
      ],
      categoryRules: [
        (v) => /^[a-zA-Z0-9\s]{1,50}$/.test(v) || "please enter valid category",
      ],
      priceRules: [
        (v) => /^[0-9.]{1,50}$/.test(v) || "please enter valid price",
      ],
      categoriesrules: [
        (v) => /^[a-zA-Z0-9\s]{1,50}$/.test(v) || "please enter valid category",
      ],
      productDescription: "",
      ProductCategory: "",
      productPrice: "",
      ProductSeller: "",
      ProductImage: "",
      categories: ["cloth", "Mobile", "Desktop"],
      selected: [],
      Products: [],
      openedProduct: {},
      ViewProductcard: false,
      stars: 3,
      // imagURL: "../assets/Uploads/",
      currentProductId: "",
      addCategoryOpened: false,
      cartProducts: [],
      active: "home",
      user: "",
      MyOrders: "",
      quantity: 1,
      showcheckout: false,
      cardOptions: ["Visa", "Mastercard", "AMEX"],
      totalPrice: "",
      paymentfailedPopup: false,
      cardtype: "",
      showProfile: false,
      showsearchDate: false,
      cardNumber: "",
      endDate: "",
      startDate: "",
      isadmin: false,
      loginPopoup: false,
      isLogedin: false,
      selectedCategory:"",
      selectedCategoryProduct:"",
    };
  },
  // computed: {
  //   propValue() {
  //     return this.$route.params.propName;
  //   },
  // },
  methods: {
    getImgUrl(fileName) {
      console.log("entered in function===============")
    // var images = require.context('../assets/Uploads', false, /\.png\.jfif\.jpg\.jpeg\.svg$/)
    console.log('../assets/Uploads/'+fileName);

    // return require('../assets/Uploads'+fileName );
       return '../assets/Uploads/'+fileName ;
    
  },
    addressSubmithandler(){
      
      this.newAddressshow = false;
    },
    newAddresspopup(){
       this.newAddressshow=true;
    },
    showCategory(category){
    this.selectedCategory= category;
    this.selectedCategoryProduct = this.Products.filter(product=> product.productCategory == category);
    console.log("selectedCategoryProduct++++======",this.selectedCategoryProduct);
    },
    openProductDetails(product) {
      this.selectedProduct = product;
      this.openproduct = true;
    },
    openAddProduct() {
      this.addProductOpened = true;
    },
    showOrderNotification () {
      this.$refs.notify.show({
        message: 'Product Ordered',
        color: 'positive',
        icon: 'check_circle'
      })
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
    AddToCart(product) {
      console.log("++++++++++++++++++++++", product);
      let product1 = {};
      product1.productName = product.productName;
      product1._id = product._id;
      product1.productDescription = product.productDescription;
      product1.productCategory = product.productCategory;
      product1.productPrice = product.productPrice;
      product1.quantity = product.hasOwnProperty("quantity")
        ? product.quantity
        : 1;
      console.log("this is project", product1);
      if (this.user != null) {
        if (this.cartProducts != null && this.cartProducts.length > 0) {
          var test = this.cartProducts;
          test.push(product1);

          this.cartProducts = test;

          console.log(this.cartProducts.length);
          var savetoLocal = localStorage.getItem("cartProduct");
          savetoLocal = JSON.parse(savetoLocal);
          console.log(savetoLocal);
          let found = false;
          if (savetoLocal != null) {
            savetoLocal[this.user._id].forEach((pro) => {
              if (pro._id == product1._id) {
                pro.quantity = pro.quantity + 1;
                found = true;
                var savetoLocalString = JSON.stringify(savetoLocal);
                localStorage.setItem("cartProduct", savetoLocalString);
              }
            });
          }
          if (!found) {
            savetoLocal[this.user._id] = this.cartProducts;
            var cartProductString = JSON.stringify(savetoLocal);
            localStorage.setItem("cartProduct", cartProductString);
            console.log("++++++++++++++++++++++", this.cartProducts);
          }
          this.cartProducts = localStorage.getItem("cartProduct");
          this.cartProducts = JSON.parse(this.cartProducts);
          this.cartProducts = this.cartProducts[this.user._id];
        } else {
          this.cartProducts = [];
          this.cartProducts.push(product1);
          var arr = [];
          arr.push(product1);
          var savetoLocal = {};
          savetoLocal[this.user._id] = arr;
          var cartProductString = JSON.stringify(savetoLocal);
          localStorage.setItem("cartProduct", cartProductString);
        }
      } else {
        if (
          this.cartProducts != null &&
          this.cartProducts != undefined &&
          this.cartProducts.length > 0
        ) {
          var test = this.cartProducts;
          test.push(product1);
          this.cartProducts = test;
          // this.cartProducts[this.cartProducts.length] = product1;

          var savetoLocal = localStorage.getItem("cartProduct");
          savetoLocal = JSON.parse(savetoLocal);
          console.log(savetoLocal);
          let found;
          if (savetoLocal != null && savetoLocal != undefined) {
            savetoLocal["visiter"].forEach((pro) => {
              if (pro._id == product1._id) {
                pro.quantity = pro.quantity + 1;
                found = true;
                var savetoLocalString = JSON.stringify(savetoLocal);
                localStorage.setItem("cartProduct", savetoLocalString);
              }
            });
          }
          if (!found) {
            savetoLocal["visiter"] = this.cartProducts;
            var cartProductString = JSON.stringify(savetoLocal);
            localStorage.setItem("cartProduct", cartProductString);
            console.log("++++++++++++++++++++++", this.cartProducts);
          }
          this.cartProducts = localStorage.getItem("cartProduct");
          this.cartProducts = JSON.parse(this.cartProducts);
          this.cartProducts = this.cartProducts["visiter"];
        } else {
          this.cartProducts = [];
          this.cartProducts.push(product1);
          var arr = [];
          arr.push(product1);
          var savetoLocal = {};
          savetoLocal["visiter"] = arr;
          var cartProductString = JSON.stringify(savetoLocal);
          localStorage.setItem("cartProduct", cartProductString);
        }
      }
    },
    deleteToCart(product) {
      if (this.user != null) {
        let index;
        var savetoLocal = localStorage.getItem("cartProduct");
        savetoLocal = JSON.parse(savetoLocal);
        this.cartProducts = savetoLocal[this.user._id];
        for (var i = 0; i < this.cartProducts.length; i++) {
          if (this.cartProducts[i]._id == product) {
            index = i;
          }
        }
        console.log(this.cartProducts);
        this.cartProducts.splice(index, 1);
        let newCartProducts = [];
        for (var j = 0; j < this.cartProducts.length; j++) {
          newCartProducts[j] = this.cartProducts[j];
        }

        savetoLocal[this.user._id] = newCartProducts;
        var cartProductString = JSON.stringify(savetoLocal);
        console.log("+++++++++hvjsdjf+++++++++++++", cartProductString);
        localStorage.setItem("cartProduct", cartProductString);
        console.log("++++++++++++++++++++++", this.cartProducts);
      } else {
        let index;
        var savetoLocal = localStorage.getItem("cartProduct");
        savetoLocal = JSON.parse(savetoLocal);
        this.cartProducts = savetoLocal["visiter"];
        for (var i = 0; i < this.cartProducts.length; i++) {
          if (this.cartProducts[i]._id == product) {
            index = i;
          }
        }
        console.log(this.cartProducts);
        this.cartProducts.splice(index, 1);
        let newCartProducts = [];
        for (var j = 0; j < this.cartProducts.length; j++) {
          newCartProducts[j] = this.cartProducts[j];
        }

        savetoLocal[this.user._id] = newCartProducts;
        var cartProductString = JSON.stringify(savetoLocal);
        console.log("+++++++++hvjsdjf+++++++++++++", cartProductString);
        localStorage.setItem("cartProduct", cartProductString);
        console.log("++++++++++++++++++++++", this.cartProducts);
      }
    },
    categorySubmithandler() {
      //  this.addCategoryOpened=false,
      this.$refs.categoryformref.validate().then(valid => {
        if (valid) {
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
            this.NewCategory = "";
          } else {
            this.categories = [];
            let newcat = this.NewCategory;
            this.categories[0] = newcat;
            console.log(this.categories);
    
            let NewCategoryString = JSON.stringify(this.categories);
            localStorage.setItem("categories", NewCategoryString);
            this.addCategoryOpened = false;
            this.NewCategory = "";
          }
        } 
        })
    },
    openAddCategory() {
      this.addCategoryOpened = true;
    },
    showsearchpopup() {
      this.showsearchDate = true;
    },
    searchByDate() {
      let searchData = {
        startDate: this.startDate,
        endDate: this.endDate,
      };
      axios
        .post("http://localhost:5000/order/searchbydate", searchData)
        .then((res) => {
          this.MyOrders = res.data;
          this.orders2 = res.data;
          for (var i = 0; i < this.orders2.length; i++) {
        // console.log("+++++", this.orders[i]);
        for (var j = 0; j < this.Products.length; j++) {
          // console.log(this.Products[j]);
          if (this.orders2[i].ProductId == this.Products[j]._id) {
            // let abc = this.Products[j];
            let abc = {};
            for (const key in this.Products[j]) {
              abc[key] = this.Products[j][key];
            }
            confirmOrders[i] = abc;
            // console.log("confirmOrders========",confirmOrders)
            break;
          }
        }
      }
      this.MyOrders = confirmOrders;
        })
        .catch((err) => {
          console.log(err);
        });
        
      this.showsearchDate = false;
    },
    Submithandler() {
      this.$refs.addProductform.validate().then((valid) => {
        if (valid) {
          if (this.currentProductId) {
            this.callEditApi(this.openedProduct);
          } else {
            console.log("focused");
            console.log(this.productImage);
            const formData = new FormData();
            formData.append("productName", this.productName);
            formData.append("productDescription", this.productDescription);
            formData.append("productCategory", this.ProductCategory);
            // formData.append("productSeller", this.ProductSeller);
            formData.append("productPrice", this.productPrice);
            formData.append("productRating", this.productRating);
            formData.append("adminId", this.user._id);
            formData.append("Deleted", false);
            if(this.productImage != undefined){
              formData.append("productImage", this.productImage[0]);
            }
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
            // this.ProductSeller = "";
            this.ProductImage = "";
            this.productPrice = "";
            this.stars = 3;
            axios
              .post("http://localhost:5000/addProduct", formData)
              .then((response) => {
                console.log(response);
                this.getProducts();
                if (response.data === "Product added successfully") {
                  console.log(response.data);
                  // this.router.push('/')
                  //   navigate("/Dashboard",{state:response.data.user});
                  this.addProductOpened=false;
                  console.log("inside here+++++++++++++++++=========================++++++++++++++++")
                  this.$refs.addProductform.reset();
                  this.addProductOpened = false;
                  this.productName = "";
                  this.productDescription = "";
                  this.ProductCategory = "";
                  // this.ProductSeller = "";
                  this.ProductImage = "";
                  this.productPrice = "";
                  this.stars = 3;
                } else {
                  //alert(response.data.message);
                  let data = [true, response.data.user];
                }
              })
              .catch((err, response) => {
                console.log("error inside catch-" + err);
              });
          }
        }else{
          console.log("invalid==================",valid)
        }
      });
    },
    callEditApi(product) {
      console.log("inside edit API", product);
      // const productData = {
      //   _id: this.currentProductId,
      //   productName: this.productName,
      //   productDescription: this.productDescription,
      //   productCategory: this.ProductCategory,
      //   productSeller: this.ProductSeller,
      //   productImage: this.ProductImage[0],
      //   productPrice: this.productPrice,
      //   Deleted: false,
      // };
      const formData = new FormData();

            formData.append("_id", this.currentProductId);
            formData.append("productName", this.productName);
            formData.append("productDescription", this.productDescription);
            formData.append("productCategory", this.ProductCategory);
            // formData.append("productSeller", this.ProductSeller);
            formData.append("productPrice", this.productPrice);
            formData.append("productRating", this.productRating);
            formData.append("adminId", this.user._id);
            formData.append("Deleted", false);
            if(this.productImage != undefined){
              formData.append("productImage", this.productImage[0]);
            }

      // console.log(productData);
      axios
        .post("http://localhost:5000/editProduct", formData)
        .then((response) => {
          console.log(response);
          this.getProducts();
          if (response.data) {
            console.log(response.data);
            this.addProductOpened=false;
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
          this.getProductsnew();
          if (response.data.message === "") {
            console.log(response.data);
            // this.router.push('/')
            //   navigate("/Dashboard",{state:response.data.user});
          } else {
            // alert(response.data);
            console.log(response.data);
          }
        })
        .catch((err, response) => {
          console.log("error inside catch-" + err);
        });
    },
    submitForm() {
      if (this.cardNumber == "123456789101" || this.cardNumber.length < 12) {
        // alert("invalid card details");
        this.paymentfailedPopup = true;
      } else {
        this.cartProducts.forEach((pro) => {
          const orderDetails = {
            userId: this.user._id,
            productId: pro._id,
            quantity: pro.quantity,
            status: "out for delivery",
            orderDateTime: Date.now,
            cancelled: false,
          };
          console.log(orderDetails);

          axios
            .post("http://localhost:5000/createOrders", orderDetails)
            .then((response) => {
              console.log(response);
              // this.showOrderNotification();
              this.getProducts();
              // if (response.data.message === " sucess") {
                console.log(response.data);
                // this.router.push('/')
                //   navigate("/Dashboard",{state:response.data.user});
              // } else {
              //   //alert(response.data.message);
              //   let data = [true, response.data.user];
              // }
            })
            .catch((err, response) => {
              console.log("error inside catch-" + err);
            });
        });
      }
    },
    goTologinPage() {
      console.log("into to function");
      this.$router.push("login");
    },
    goTOCart() {
      this.active = "cart";
    },
    goToHome() {
      this.active = "home";
    },
    goTocategory() {
      this.active = "category";
    },
    Logout() {
      localStorage.removeItem("userData");
      localStorage.removeItem("isLogedin");
      this.cartProducts = "";
      this.isAdmin=false;
      this.isadmin=false;
      this.MyOrders=[];
      this.user = {};
      this.isLogedin = false;
      this.$router.push("dashboard");
    },
    showProfileFunction() {
      this.showProfile = true;
    },
    goToMyOrders() {
      console.log();
      console.log("+++++", this.orders);
      let confirmOrders = [];
      for (var i = 0; i < this.orders2.length; i++) {
        // console.log("+++++", this.orders[i]);
        for (var j = 0; j < this.Products.length; j++) {
          // console.log(this.Products[j]);
          if (this.orders2[i].ProductId == this.Products[j]._id) {
            // let abc = this.Products[j];
            let abc = {};
            for (const key in this.Products[j]) {
              abc[key] = this.Products[j][key];
            }
            confirmOrders[i] = abc;
            // console.log("confirmOrders========",confirmOrders)
            break;
          }
        }
      }
      console.log(confirmOrders);

      this.MyOrders = confirmOrders;
      // this.orders=confirmOrders;
      console.log("my order+++++", this.MyOrders);
      this.active = "order";
    },
    Cancelorder(product) {
      console.log(this.MyOrders);
      for (var a = 0; a < this.MyOrders.length; a++) {
        if (product._id == this.MyOrders[a]._id) {
          this.MyOrders = this.MyOrders.splice(a, 1);
        }
      }
      let orderDetails = {
        _id: product._id,
        id: product._id,
        cancelled: true,
      };
      console.log(orderDetails);
      console.log(product._id);

      axios
        .post("http://localhost:5000/deleteOrders", orderDetails)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    checkOutPopup() {
      this.totalPrice = 0;
      this.cartProducts.forEach((element) => {
        let price = Number(element.productPrice) * element.quantity;
        this.totalPrice += Number(price);
      });
      if (this.user != null) {
        this.showcheckout = true;
      } else {
        this.loginPopoup = true;
      }
    },
    handleQuantitytChange(product) {
      var quantity = document.getElementById("quantityInput").value;
      this.cartProducts.forEach((element) => {
        if (element._id == product._id) {
          element.quantity = quantity;
        }
      });
    },
    ViewProduct(product) {
      this.openedProduct._id = product._id;
      this.openedProduct.productName = product.productName;
      this.openedProduct.productDescription = product.productDescription;
      this.openedProduct.productCategory = product.productCategory;
      // this.openedProduct.productSeller = product.productSeller;
      this.openedProduct.productPrice = product.productPrice;
      console.log(this.openedProduct._id);
      this.ViewProductcard = true;
    },
    getProductsnew() {
      axios
        .get("http://localhost:5000/getProduct")
        .then((res) => {
          console.log("this is response", res);
          this.Products = res.data;   
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProducts() {
      axios.get("http://localhost:5000/getProduct").then((res) => {
        console.log("this is response", res);
        this.Products = res.data;
        this.categories = localStorage.getItem("categories");
        this.categories = JSON.parse(this.categories);

        // localStorage.removeItem('cartProduct')
        this.user = localStorage.getItem("userData");
        this.user = JSON.parse(this.user);
        var user = this.user;
        this.cartProducts = localStorage.getItem("cartProduct");
        this.cartProducts = JSON.parse(this.cartProducts);
        // this.cartProducts = this.cartProducts[this.user._id]
        if (this.user != null && this.user.hasOwnProperty("isAdmin")) {
           this.isadmin = this.user.isAdmin;
          this.cartProducts = this.cartProducts[this.user._id];
        }else if(this.user != null){
          this.cartProducts = this.cartProducts[this.user._id];
          let userId ={
             id: this.user._id
          }
        
        } else {
          this.isadmin = false;
          this.cartProducts = [];
        }
        // console.log(propValue());
        this.isLogedin = localStorage.getItem("isLogedin");
        this.isLogedin = JSON.parse(this.isLogedin);
        if (this.isLogedin == null || this.isLogedin == undefined) {
          this.isLogedin = false;
        }
      });
      if (this.user != null && this.user != undefined) {
        console.log(this.user)
          let userId = {
                _id: this.user._id,
                name:"raj",
              }
        console.log(this.user._id)
       axios
        .post("http://localhost:5000/Orders",userId)
        .then((res) => {
          console.log("++=============",res)
          this.orders = res.data;
          this.orders2 = res.data;
          console.log(this.orders)
        })
      }
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
          // this.searchQuery=""
        })
        .catch((err) => {
          console.log("Error", err);
        });
    },
    // +++++++++++++++++++++++++Order product +++++++++++++++++++++++++++++++++++++++++++
    Addorder(id) {
      console.log("++++++++++++++++++++++++++++", id);
      const orderDetails = {
        userId: "63d76d7d68d4b30d13a1e723",
        productId: id,
        quantity: "1",
        status: "out for delivery",
        orderDateTime: Date.now,
        cancelled: false,
      };
      console.log(orderDetails);

      axios
        .post("http://localhost:5000/createOrders", orderDetails)
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
    },
  },
  beforeMount() {
    this.getProducts();
  },
  beforeCreate: function () {
    this.cartProducts = localStorage.getItem("cartProduct");
    this.cartProducts = JSON.parse(this.cartProducts);
    this.user = localStorage.getItem("userData");
    this.user = JSON.parse(this.user);
    if (this.user != null && this.user.hasOwnProperty("isAdmin")) {
      this.isadmin = this.user.isAdmin;
      this.cartProducts = this.cartProducts[this.user._id];
    } else {
      this.isadmin = false;
      this.cartProducts = [];
    }
  },
};
</script>
<style lang="sass" scoped>
.menu-list .q-item
  border-radius: 0 32px 32px 0
</style>
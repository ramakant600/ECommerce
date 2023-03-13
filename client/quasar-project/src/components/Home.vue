<template>
  <div>
     <q-dialog v-model="carousel">
      <q-carousel
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        v-model="slide"
        control-color="primary"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        height="200px"
        class="bg-white shadow-1 rounded-borders"
      >
        <q-carousel-slide :name="1" class="column no-wrap flex-center">
          <q-icon name="style" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2" class="column no-wrap flex-center">
          <q-icon name="live_tv" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3" class="column no-wrap flex-center">
          <q-icon name="bookes" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="4" class="column no-wrap flex-center">
          <q-icon name="cloth" color="primary" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
// import router from "router/routes.vue"
export default {
  name: "HomeComponent",
  data() {
    return {
      searchQuery: "",
      addProductOpened: false,
      productName: "",
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
      NewCategory: "",
      carousel:true
    };
  },
  // props: {
  //   adminId: String,
  // },
  methods: {
    ViewProduct(product) {
      this.openedProduct._id = Reflect.get(product, "_id");
      this.openedProduct.productName = Reflect.get(product, "productName");
      this.openedProduct.productDescription = Reflect.get(
        product,
        "productDescription"
      );
      this.openedProduct.productCategory = Reflect.get(
        product,
        "productCategory"
      );
      this.openedProduct.productSeller = Reflect.get(product, "productSeller");
      this.openedProduct.productPrice = Reflect.get(product, "productSeller");
      console.log(this.openedProduct._id);
      this.ViewProductcard = true;
    },
    getProducts() {
      axios.get("http://localhost:5000/getProduct").then((res) => {
        console.log("this is response", res);
        this.Products = res.data;
      });
    //   this.categories = localStorage.getItem("categories");
    },
  },
  beforeMount() {
    this.getProducts();
  },
};
</script>
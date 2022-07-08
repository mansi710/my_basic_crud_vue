import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./axios";
import AppLink from "@/components/AppLink.vue";

createApp(App)
  .component(
    "AppLink",
    AppLink
    // "pagination",
    // require("laravel-vue-pagination"),
    // "data-component",
    // require("./components/PaginationComponent.vue")
  )
  .use(router /** , require("vue-resource")*/)
  .mount("#app");

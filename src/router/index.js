import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/home",
    name: "home",
    // component: () => import("@/views/HomeView.vue"),
    components: {
      default: () => import("@/views/HomeView.vue"),
      newSideBar: () => import("@/components/newSideBar.vue"),
    },
    meta: {
      requiresAuth: true,
    },
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
  //LOGIN REGISTER API
  {
    path: "/",
    name: "apiLogin",
    alias: "/apiLogin",
    component: () => import("@/views/LoginC.vue"),
  },
  {
    path: "/apiRegister",
    name: "apiRegister",
    component: () => import("@/views/RegisterC.vue"),
  },
  {
    path: "/apiLogout",
    name: "apiLogout",
    component: () => import("@/views/LogOut.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  //form wrong URL enter
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFound.vue"),
  },
  //for forgot password
  {
    path: "/apiForgotPassword",
    name: "apiForgotPassword",
    component: () => import("@/views/ForgotPassword.vue"),
  },
  //for reset password
  {
    path: "/apiResetPassword/:token",
    name: "apiResetPassword",
    component: () => import("@/views/ResetPasswordView.vue"),
  },
  //for create new blog
  {
    path: "/apiAddNewBlog",
    name: "apiAddNewBlog",
    components: {
      default: () => import("@/views/AddNewBlog.vue"),
      //key is the same as the name given to the router view oven in the app.vue file
      newSideBar: () => import("@/components/newSideBar.vue"),
    },
  },
  //for listing blog
  {
    path: "/apiListOfBlog",
    name: "apiListOfBlog",
    components: {
      default: () => import("@/views/ListOfBlog.vue"),
      //key is the same as the name given to the router view oven in the app.vue file
      newSideBar: () => import("@/components/newSideBar.vue"),
    },
  },
  {
    path: "/apiEditBlog/:id",
    name: "apiEditBlog",
    component: () => import("@/views/EditBlog.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// GLOBAL NAVIGATION GUARD
router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    if (!localStorage.getItem("token")) {
      alert("First You Will Logged in");
      return { name: "apiLogin" };
    }
  }
});

export default router;

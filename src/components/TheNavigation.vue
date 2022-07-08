<template>
  <div id="nav">
    <AppLink id="logo" to="/home">My VueJs Application</AppLink>
    <!-- Main Login and REGISTER With API -->
    <AppLink :to="{ name: 'apiLogin' }">API LOGIN</AppLink>
    <AppLink :to="{ name: 'apiRegister' }">API REGISTER</AppLink>
    <AppLink :to="{ name: 'apiLogout' }">LOGOUT</AppLink>
  </div>
</template>

<script>
// for clean up code
// import sourceData from "@/data.json";
import AppLink from "./AppLink.vue";
export default {
  data() {
    return {
      // destinations: sourceData.destinations,
    };
  },
  components: { AppLink },
};
</script>

<style lang="css">
#nav .vue-school-active-link {
  color: cyan;
  border-bottom: 2px solid red;
}
</style>

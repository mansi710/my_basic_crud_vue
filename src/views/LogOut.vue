<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
  />
  <div class="form-group row">
    <div class="col-sm-12">
      <button type="submit" class="btn btn-primary" id="btn" @click="logout">
        Logout
      </button>
    </div>
  </div>
  <br />
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      success: "",
    };
  },
  methods: {
    logout() {
      axios
        .post("/logout")
        .then(localStorage.removeItem("token"), this.$router.push("/"))
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style scoped>
#btn {
  margin-top: 100px;
}
</style>

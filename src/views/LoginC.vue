<template>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
    crossorigin="anonymous"
  />
  <!-- <div class="container-fluid" id="page">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="card">
          <h3 class="card-header">Login</h3>
          <div class="card-body">
            <validation-errors
              :errors="validationErrors"
              v-if="validationErrors"
            >
              {{ validationErrors }}
            </validation-errors>
            <form>
              <div class="form-group">
                <input
                  type="text"
                  name="email"
                  v-model="login.email"
                  placeholder="email@example.com"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="password"
                  v-model="login.password"
                  placeholder="****"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <center>
                  <button
                    class="btn-success btn"
                    type="button"
                    @click="CreatePost"
                  >
                    Submit
                  </button>
                </center>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="container">
    <form @submit.prevent="CreatePost" id="page">
      <div class="container"></div>
      <div class="card-header">
        <h4>Login</h4>
      </div>
      <div class="form-group row">
        <!-- <div v-for="(errorArray, idx) in notifmsg" :key="idx">
          <div
            v-for="(allErrors, idx) in errorArray"
            :key="idx"
            class="alert alert-danger"
          >
            {{ allErrors }}
          </div>
        </div> -->
        <div v-if="notifmsg" class="alert alert-danger">
          {{ notifmsg }}
        </div>
      </div>
      <br />
      <div class="form-group row">
        <label for="title" class="col-sm-2 col-form-label"> Enter Email </label>
        <div class="col-sm-8">
          <input
            type="text"
            class="form-control"
            placeholder="enter your email"
            v-model="login.email"
          />
        </div>
      </div>
      <br />
      <div class="form-group row">
        <label for="title" class="col-sm-2 col-form-label">
          Enter Password
        </label>
        <div class="col-sm-8">
          <input
            type="text"
            class="form-control"
            id="title"
            placeholder="enter your password"
            v-model="login.password"
          />
        </div>
      </div>
      <br />
      <div class="form-group row">
        <div class="col-sm-10">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
      </div>
      <br />
      <router-link to="/apiForgotPassword">Forgot Password</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";
// import ValidationError from "@/components/ValidationError.vue";
export default {
  name: "CreatePost",
  data() {
    return {
      // components: { ValidationError },
      // validationErrors: "",
      login: {
        // userId: "",
        email: "",
        password: "",
      },
      notifmsg: "",
    };
  },
  methods: {
    CreatePost() {
      axios
        .post("login", this.login)
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);
          if (response.status == 200) {
            alert("sucess");
            this.$router.push("/home");
          }
        })
        .catch((error) => {
          if (error.response.status == 422) {
            console.log(error.response.data);
            this.notifmsg = error.response.data.emptyData;
          }
          if (error.response.status == 401) {
            console.log(error.response.data);
            this.notifmsg = error.response.data.wrongCredentials;
          }
        });
    },
  },
};
</script>
<style>
#page {
  margin-top: 100px;
}
</style>
